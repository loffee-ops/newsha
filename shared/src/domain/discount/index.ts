export { validateCoupon } from "./discount.validate";
export { calculateDiscount } from "./discount.calculate";
export { calculateDiscountFromCart } from "./discount.cart";
export { applyCoupon } from "./discount.apply";

export type { CouponValidationResult } from "./discount.validate";
export type { DiscountCartRow } from "./discount.calculate";
export type { ApplyCouponResult } from "./discount.apply";
export type { Coupon, DiscountType } from "./discount.types";
