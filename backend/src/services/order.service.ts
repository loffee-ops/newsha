import type { Request } from "express";

import type { ID } from "@shared/primitives";
import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order, OrderStatus } from "@shared/domain/order";

import { OrderModel } from "@/models/order.model";
import type { OrderDB } from "@/models/order.model";
import { CartModel, type CartDB } from "@/models/cart.model";
import { ProductModel, type ProductDoc } from "@/models/product.model";

import { toOrder, toOrders } from "@/mappers/order";
import { paginate, type PaginatedResult } from "@/lib/db";
import { OrderErrors, ProductErrors } from "@/errors";

type AdminOrderFilters = {
    status?: OrderStatus;
};

export class OrderService {
    async createFromCheckout(userId: ID, dto: CheckoutDTO): Promise<Order> {
        const cart = await CartModel.findOne({ userId: String(userId) }).lean<CartDB | null>();

        if (!cart || cart.items.length === 0) {
            throw ProductErrors.cartEmpty();
        }

        const productIds = cart.items.map((item) => String(item.productId));

        const products = await ProductModel.find({ _id: { $in: productIds } }).lean<ProductDoc[]>();

        const productMap = new Map(products.map((product) => [String(product._id), product]));

        const items: Array<{
            productId: string;
            volumeValue: number | null;
            name: string;
            price: number;
            quantity: number;
        }> = [];

        let total = 0;

        for (const cartItem of cart.items) {
            const product = productMap.get(String(cartItem.productId));

            if (!product) {
                throw ProductErrors.notFound();
            }

            if (!cartItem.priceSnapshot) {
                throw ProductErrors.invalidProductId();
            }

            const price = Number(cartItem.priceSnapshot.price);
            const quantity = Number(cartItem.qty);

            if (Number.isNaN(price) || Number.isNaN(quantity) || quantity <= 0) {
                throw ProductErrors.invalidProductId();
            }

            total += price * quantity;

            items.push({
                productId: String(cartItem.productId),
                volumeValue:
                    cartItem.volume != null && !Number.isNaN(Number(cartItem.volume))
                        ? Number(cartItem.volume)
                        : null,
                name: product.name,
                price,
                quantity,
            });
        }

        const orderDoc = await OrderModel.create({
            userId: String(userId),
            items,
            total,
            delivery: {
                method: dto.delivery.method,
                firstName: dto.recipient.firstName,
                lastName: dto.recipient.lastName,
                middleName: dto.recipient.middleName,
                phone: dto.recipient.phone,
                city: dto.delivery.city,
                warehouse: dto.delivery.warehouse,
                postomat: dto.delivery.postomat,
                address: dto.delivery.address,
            },
            payment: {
                method: dto.payment.method,
            },
            comment: dto.comment,
        });

        await CartModel.updateOne({ userId: String(userId) }, { $set: { items: [] } });

        return toOrder(orderDoc.toObject());
    }

    async getUserOrders(userId: ID): Promise<Order[]> {
        const docs = await OrderModel.find({ userId: String(userId) })
            .sort({ createdAt: -1 })
            .lean<OrderDB[]>();

        return toOrders(docs);
    }

    async getUserOrdersPaginated(userId: ID, req: Request): Promise<PaginatedResult<Order>> {
        const result = await paginate(OrderModel, { userId: String(userId) }, req, {
            sort: { createdAt: -1 },
        });

        return {
            ...result,
            items: toOrders(result.items as OrderDB[]),
        };
    }

    async getAdminOrdersPaginated(
        req: Request,
        filters: AdminOrderFilters = {},
    ): Promise<PaginatedResult<Order>> {
        const query: Record<string, unknown> = {};

        if (filters.status !== undefined) {
            query.status = filters.status;
        }

        const result = await paginate(OrderModel, query, req, {
            sort: { createdAt: -1 },
        });

        return {
            ...result,
            items: toOrders(result.items as OrderDB[]),
        };
    }

    async getById(id: string): Promise<Order> {
        const doc = await OrderModel.findById(id).lean<OrderDB | null>();

        if (!doc) {
            throw OrderErrors.notFound();
        }

        return toOrder(doc);
    }

    async updateStatus(id: string, status: OrderStatus): Promise<Order> {
        const doc = await OrderModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true },
        ).lean<OrderDB | null>();

        if (!doc) {
            throw OrderErrors.notFound();
        }

        return toOrder(doc);
    }
}
