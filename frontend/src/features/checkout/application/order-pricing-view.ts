import type { Coupon } from "@shared/domain/discount";
import { calculateOrderPricing } from "@shared/domain/order";

import type { CartViewItemDetailed } from "@/entities/cart/types";

import { mapCartViewToPricing } from "./map-cart-view-to-pricing";

export type OrderPricingView = {
    subtotal: number;
    discount: number;
    total: number;
};

export function calculateOrderPrice(
    cart: readonly CartViewItemDetailed[],
    coupon?: Coupon,
): OrderPricingView {
    const pricingCart = mapCartViewToPricing(cart);
    const pricing = calculateOrderPricing(pricingCart, coupon);

    return {
        subtotal: Number(pricing.subtotal),
        discount: Number(pricing.discount),
        total: Number(pricing.total),
    };
}
