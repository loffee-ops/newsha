import type { Coupon } from "@shared/domain/discount";
import {
    asSubtotal,
    addSubtotal,
    calcSubtotal,
    type ID,
    type Money,
    type Quantity,
    type Subtotal,
} from "@shared/primitives";

export type PricingOrderItem = {
    readonly price: Money;
    readonly quantity: Quantity;
    readonly productId?: ID;
    readonly categoryId?: ID;
};

export type OrderPricing = {
    readonly subtotal: Subtotal;
    readonly discount: Subtotal;
    readonly total: Subtotal;
};

function zeroSubtotal(): Subtotal {
    return asSubtotal(0);
}

function subtractSubtotals(a: Subtotal, b: Subtotal): Subtotal {
    return asSubtotal(Math.max(0, Number(a) - Number(b)));
}

function toSubtotal(value: number): Subtotal {
    return asSubtotal(Math.max(0, Math.round(value)));
}

function calcCartSubtotal(cart: readonly PricingOrderItem[]): Subtotal {
    return cart.reduce<Subtotal>((sum, item) => {
        const lineTotal = calcSubtotal(item.price, item.quantity);
        return addSubtotal(sum, lineTotal);
    }, zeroSubtotal());
}

function calcPercentDiscount(subtotal: Subtotal, percent: number): number {
    return Number(subtotal) * (percent / 100);
}

function calcLinePercentDiscount(price: Money, quantity: Quantity, percent: number): number {
    return Number(price) * Number(quantity) * (percent / 100);
}

function calcCouponDiscount(
    cart: readonly PricingOrderItem[],
    subtotal: Subtotal,
    coupon: Coupon,
): number {
    switch (coupon.type) {
        case "percent":
            return calcPercentDiscount(subtotal, coupon.percent);

        case "fixed":
            return Number(coupon.amount);

        case "product":
            return cart.reduce((sum, item) => {
                if (!item.productId || !coupon.productIds.includes(item.productId)) {
                    return sum;
                }

                return sum + calcLinePercentDiscount(item.price, item.quantity, coupon.percent);
            }, 0);

        case "category":
            return cart.reduce((sum, item) => {
                if (!item.categoryId || !coupon.categoryIds.includes(item.categoryId)) {
                    return sum;
                }

                return sum + calcLinePercentDiscount(item.price, item.quantity, coupon.percent);
            }, 0);

        case "free_shipping":
            return 0;
    }
}

function canApplyCoupon(subtotal: Subtotal, coupon: Coupon): boolean {
    if (!("minOrderTotal" in coupon) || !coupon.minOrderTotal) {
        return true;
    }

    return Number(subtotal) >= Number(coupon.minOrderTotal);
}

export function calculateOrderPricing(
    cart: readonly PricingOrderItem[],
    coupon?: Coupon,
): OrderPricing {
    const subtotal = calcCartSubtotal(cart);

    if (!coupon || !canApplyCoupon(subtotal, coupon)) {
        return {
            subtotal,
            discount: zeroSubtotal(),
            total: subtotal,
        };
    }

    const rawDiscount = calcCouponDiscount(cart, subtotal, coupon);
    const discount = toSubtotal(Math.min(rawDiscount, Number(subtotal)));
    const total = subtractSubtotals(subtotal, discount);

    return {
        subtotal,
        discount,
        total,
    };
}
