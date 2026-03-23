import type { Coupon } from "./discount.types";
import type { CartRow } from "@shared/domain/cart";
import type { ID, Money } from "@shared/primitives";

import { calculateDiscount } from "./discount.calculate";
import type { DiscountCartRow } from "./discount.calculate";

type ProductMeta = {
    categoryId: ID;
};

export function calculateDiscountFromCart(
    coupon: Coupon,
    cart: readonly CartRow[],
    products: Record<ID, ProductMeta>,
): Money {
    const rows: DiscountCartRow[] = [];

    for (const item of cart) {
        const product = products[item.productId];
        if (!product) continue;

        rows.push({
            productId: item.productId,
            categoryId: product.categoryId,
            price: item.price,
            qty: item.qty,
        });
    }

    return calculateDiscount(coupon, rows);
}
