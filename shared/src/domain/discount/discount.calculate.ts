import type { Coupon } from "./discount.types";

import type { Money, ID, Quantity } from "@shared/primitives";
import { calcSubtotal, floorMoney } from "@shared/primitives";

export type DiscountCartRow = {
    readonly productId: ID;
    readonly categoryId: ID;
    readonly price: Money;
    readonly qty: Quantity;
};

function calcTotal(items: readonly DiscountCartRow[]): Money {
    let total = 0 as Money;

    for (const item of items) {
        const itemTotal = calcSubtotal(item.price, item.qty);
        total = floorMoney(Number(total) + Number(itemTotal));
    }

    return total;
}

export function calculateDiscount(coupon: Coupon, cart: readonly DiscountCartRow[]): Money {
    switch (coupon.type) {
        case "percent": {
            const total = calcTotal(cart);
            return floorMoney(Number(total) * (coupon.percent / 100));
        }

        case "fixed": {
            const total = calcTotal(cart);
            return coupon.amount > total ? total : coupon.amount;
        }

        case "free_shipping": {
            return 0 as Money;
        }

        case "category": {
            const eligible = cart.filter((item) => coupon.categoryIds.includes(item.categoryId));
            const total = calcTotal(eligible);
            return floorMoney(Number(total) * (coupon.percent / 100));
        }

        case "product": {
            const eligible = cart.filter((item) => coupon.productIds.includes(item.productId));
            const total = calcTotal(eligible);
            return floorMoney(Number(total) * (coupon.percent / 100));
        }
    }
}
