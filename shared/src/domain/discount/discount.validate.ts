import type { Coupon } from "./discount.types";
import type { Money, ISODate } from "@shared/primitives";

export type CouponValidationResult =
    | { valid: true }
    | {
          valid: false;
          reason: "expired" | "limit_reached" | "min_total_not_met";
      };

function isExpired(date: ISODate): boolean {
    return Date.parse(date) < Date.now();
}

export function validateCoupon(coupon: Coupon, orderTotal: Money): CouponValidationResult {
    if (coupon.expiresAt && isExpired(coupon.expiresAt)) {
        return { valid: false, reason: "expired" };
    }

    if (coupon.maxUses !== undefined && coupon.used >= coupon.maxUses) {
        return { valid: false, reason: "limit_reached" };
    }

    if (
        "minOrderTotal" in coupon &&
        coupon.minOrderTotal !== undefined &&
        orderTotal < coupon.minOrderTotal
    ) {
        return { valid: false, reason: "min_total_not_met" };
    }

    return { valid: true };
}
