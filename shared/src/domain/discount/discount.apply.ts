import type { Coupon } from "./discount.types";
import type { CartRow } from "@shared/domain/cart";
import type { Money, ID } from "@shared/primitives";

import { calcSubtotal, floorMoney } from "@shared/primitives";
import { validateCoupon } from "./discount.validate";
import { calculateDiscountFromCart } from "./discount.cart";

type ProductMeta = {
    categoryId: ID;
};

export type ApplyCouponResult =
    | { valid: false; reason: "expired" | "limit_reached" | "min_total_not_met" }
    | { valid: true; discount: Money; finalTotal: Money };

export function applyCoupon(
    cart: readonly CartRow[],
    coupon: Coupon,
    products: Record<ID, ProductMeta>,
): ApplyCouponResult {
    let total = 0 as Money;

    for (const item of cart) {
        const itemTotal = calcSubtotal(item.price, item.qty);
        total = floorMoney(Number(total) + Number(itemTotal));
    }

    const validation = validateCoupon(coupon, total);
    if (!validation.valid) {
        return validation;
    }

    const discount = calculateDiscountFromCart(coupon, cart, products);
    const finalTotal = floorMoney(Math.max(0, Number(total) - Number(discount)));

    return {
        valid: true,
        discount,
        finalTotal,
    };
}
