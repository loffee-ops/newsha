import type { CartRow } from "@shared/domain/cart";
import { calcSubtotal } from "@shared/primitives";

import type { StoreProductPreview } from "@/entities/product/types";
import type { CartViewItem, CartViewItemDetailed } from "@/entities/cart/types";

export function buildCartViewItems(
    rows: readonly CartRow[],
    products: readonly StoreProductPreview[],
): CartViewItemDetailed[] {
    return rows
        .map((row) => {
            if (row.volume === null) {
                return null;
            }

            const product = products.find((p) => p.id === row.productId);
            if (!product) {
                return null;
            }

            const volume = product.volumes?.find((v) => v.value === row.volume);
            if (!volume) {
                return null;
            }

            const unitPrice = row.price;
            const totalPrice = calcSubtotal(unitPrice, row.qty);

            const item: CartViewItem = {
                id: row.productId,
                slug: product.slug,
                name: product.name,
                image: product.image ?? "",
                volumeValue: row.volume,
                price: row.price,
                ...(row.oldPrice !== undefined ? { oldPrice: row.oldPrice } : {}),
                qty: row.qty,
            };

            return {
                item,
                product,
                volume,
                unitPrice,
                totalPrice,
            };
        })
        .filter((value): value is CartViewItemDetailed => value !== null);
}
