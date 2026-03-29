import type { ID, Money, Subtotal } from "@shared/primitives";

export type Currency = "UAH";

export type PageLeaveEvent = {
    type: "page_leave";
    path: string;
    duration: number;
};

export type TimeOnPageEvent = {
    type: "time_on_page";
    path: string;
    duration: number;
};

export type CheckoutItem = {
    readonly productId: ID;
    readonly qty: number;
    readonly price: Money;
    readonly value: Subtotal;
};

export type AnalyticsEvent =
    | { type: "page_view"; path: string }
    | { type: "search"; query: string }
    | { type: "error"; error: unknown }
    | {
          type: "view_product";
          productId: ID;
          name: string;
          price: Money;
          value: Money;
      }
    | {
          type: "add_to_cart";
          productId: ID;
          price: Money;
          qty: number;
          value: Subtotal;
      }
    | {
          type: "begin_checkout";
          items: readonly CheckoutItem[];
          totalQty: number;
          totalPrice: Subtotal;
          value: Subtotal;
      }
    | {
          type: "purchase";
          orderId: ID;
          total: Subtotal;
          value: Subtotal;
      }
    | PageLeaveEvent
    | TimeOnPageEvent;

export type ViewProductEvent = Extract<AnalyticsEvent, { type: "view_product" }>;
export type ViewProductParams = Omit<ViewProductEvent, "type">;

export type AddToCartEvent = Extract<AnalyticsEvent, { type: "add_to_cart" }>;
export type AddToCartParams = Omit<AddToCartEvent, "type">;

export type BeginCheckoutEvent = Extract<AnalyticsEvent, { type: "begin_checkout" }>;
export type BeginCheckoutParams = Omit<BeginCheckoutEvent, "type">;

export type PurchaseEvent = Extract<AnalyticsEvent, { type: "purchase" }>;
export type PurchaseParams = Omit<PurchaseEvent, "type">;

export type UTM = {
    source?: string;
    medium?: string;
    campaign?: string;
};
