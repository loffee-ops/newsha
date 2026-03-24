import type { Money, Quantity, ID } from "@shared/primitives";
import { asID, asMoney, asQuantity } from "@shared/primitives";
import type { ProductVolume } from "@shared/domain/product";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";
import type { CartRow } from "@shared/domain/cart";

import type { CartDB, CartItemDB } from "@/models/cart.model";
import { CartModel } from "@/models/cart.model";
import { ProductModel, type ProductDoc } from "@/models/product.model";

import { ProductErrors } from "@/errors";

function makeKey(productId: ID, volume: ProductVolume | null): string {
    return `${productId}:${volume ?? "base"}`;
}

function toNullableVolume(volume: ProductVolume | null | undefined): ProductVolume | null {
    return volume ?? null;
}

function pickSnapshotFromProduct(
    product: ProductDoc,
    volume: ProductVolume | null,
): { price: Money; oldPrice?: Money } {
    if (volume !== null) {
        const matchedVolume = product.volumes.find((item) => item.value === volume);

        if (!matchedVolume) {
            throw ProductErrors.invalidProductVolume();
        }

        return {
            price: asMoney(matchedVolume.price),
            oldPrice: matchedVolume.oldPrice != null ? asMoney(matchedVolume.oldPrice) : undefined,
        };
    }

    if (product.price == null) {
        throw ProductErrors.notFound();
    }

    return {
        price: asMoney(product.price),
        oldPrice: product.oldPrice != null ? asMoney(product.oldPrice) : undefined,
    };
}

function dbToCartRow(item: CartItemDB): CartRow {
    return {
        productId: asID(item.productId),
        volume: toNullableVolume(item.volume),
        qty: asQuantity(item.qty),
        price: asMoney(item.priceSnapshot.price),
        oldPrice:
            item.priceSnapshot.oldPrice != null ? asMoney(item.priceSnapshot.oldPrice) : undefined,
    };
}

function cartRowToDB(
    productId: ID,
    volume: ProductVolume | null,
    qty: Quantity,
    price: Money,
    oldPrice?: Money,
): CartItemDB {
    return {
        productId: String(productId),
        volume,
        qty: Number(qty),
        priceSnapshot: {
            price: Number(price),
            oldPrice: oldPrice != null ? Number(oldPrice) : null,
        },
    };
}

export class CartService {
    async getCartRows(userId: ID): Promise<CartRow[]> {
        const cart = await CartModel.findOne({ userId: String(userId) }).lean<CartDB | null>();

        if (!cart) {
            return [];
        }

        return cart.items.map(dbToCartRow);
    }

    async addToCart(userId: ID, dto: AddToCartDTO): Promise<CartRow[]> {
        const qty = asQuantity(dto.qty);

        if (Number(qty) <= 0) {
            throw ProductErrors.invalidQuantity();
        }

        const volume = toNullableVolume(dto.volume);

        const product = await ProductModel.findById(
            String(dto.productId),
        ).lean<ProductDoc | null>();

        if (!product || !product.isActive) {
            throw ProductErrors.notFound();
        }

        const snapshot = pickSnapshotFromProduct(product, volume);

        const cart = await CartModel.findOne({ userId: String(userId) }).lean<CartDB | null>();
        const items: CartItemDB[] = cart?.items ?? [];

        const key = makeKey(asID(dto.productId), volume);

        const next = [...items];
        const existingIndex = next.findIndex(
            (item) => makeKey(asID(item.productId), toNullableVolume(item.volume)) === key,
        );

        if (existingIndex === -1) {
            next.push(
                cartRowToDB(asID(dto.productId), volume, qty, snapshot.price, snapshot.oldPrice),
            );
        } else {
            const existingItem = next[existingIndex];
            const nextQty = asQuantity(Number(existingItem.qty) + Number(qty));

            next[existingIndex] = cartRowToDB(
                asID(existingItem.productId),
                toNullableVolume(existingItem.volume),
                nextQty,
                snapshot.price,
                snapshot.oldPrice,
            );
        }

        await CartModel.updateOne(
            { userId: String(userId) },
            {
                $set: {
                    userId: String(userId),
                    items: next,
                },
            },
            { upsert: true },
        );

        return this.getCartRows(userId);
    }

    async removeFromCart(userId: ID, dto: RemoveFromCartDTO): Promise<CartRow[]> {
        const cart = await CartModel.findOne({ userId: String(userId) }).lean<CartDB | null>();

        if (!cart) {
            return [];
        }

        const key = makeKey(asID(dto.productId), toNullableVolume(dto.volume));

        const next = cart.items.filter(
            (item) => makeKey(asID(item.productId), toNullableVolume(item.volume)) !== key,
        );

        await CartModel.updateOne(
            { userId: String(userId) },
            {
                $set: {
                    userId: String(userId),
                    items: next,
                },
            },
        );

        return this.getCartRows(userId);
    }

    async clearCart(userId: ID): Promise<void> {
        await CartModel.updateOne(
            { userId: String(userId) },
            {
                $set: {
                    userId: String(userId),
                    items: [],
                },
            },
            { upsert: true },
        );
    }
}
