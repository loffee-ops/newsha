import type { ID, Money, ISODate } from "@shared/primitives";

export type DiscountType = "percent" | "fixed" | "free_shipping" | "category" | "product";

type BaseCoupon = {
    code: string;
    maxUses?: number;
    used: number;
    expiresAt?: ISODate;
};

type OrderLimitedCoupon = BaseCoupon & {
    minOrderTotal?: Money;
};

export type Coupon =
    | (OrderLimitedCoupon & {
          type: "percent";
          percent: number;
      })
    | (OrderLimitedCoupon & {
          type: "fixed";
          amount: Money;
      })
    | (OrderLimitedCoupon & {
          type: "free_shipping";
      })
    | (BaseCoupon & {
          type: "category";
          percent: number;
          categoryIds: readonly ID[];
      })
    | (BaseCoupon & {
          type: "product";
          percent: number;
          productIds: readonly ID[];
      });
