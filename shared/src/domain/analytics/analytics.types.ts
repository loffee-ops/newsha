import type { ID, Money, Subtotal } from "@shared/primitives";

export type Currency = "UAH";

export type UTM = {
    source?: string;
    medium?: string;
    campaign?: string;
};

export type AnalyticsErrorPayload = {
    message: string;
    name?: string;
    stack?: string;
};

export type AnalyticsBase = {
    utm?: UTM;
};

export type PageLeaveEvent = AnalyticsBase & {
    type: "page_leave";
    path: string;
    duration: number;
};

export type TimeOnPageEvent = AnalyticsBase & {
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
    | (AnalyticsBase & { type: "page_view"; path: string })
    | (AnalyticsBase & { type: "search"; query: string })
    | (AnalyticsBase & { type: "error"; error: AnalyticsErrorPayload })
    | (AnalyticsBase & {
          type: "view_product";
          productId: ID;
          name: string;
          price: Money;
          value: Money;
      })
    | (AnalyticsBase & {
          type: "add_to_cart";
          productId: ID;
          price: Money;
          qty: number;
          value: Subtotal;
      })
    | (AnalyticsBase & {
          type: "begin_checkout";
          items: readonly CheckoutItem[];
          totalQty: number;
          totalPrice: Subtotal;
          value: Subtotal;
      })
    | (AnalyticsBase & {
          type: "purchase";
          orderId: ID;
          total: Subtotal;
          value: Subtotal;
      })
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

export const ANALYTICS_EVENT_VALUES = [
    "page_view",
    "search",
    "error",
    "view_product",
    "add_to_cart",
    "begin_checkout",
    "purchase",
    "page_leave",
    "time_on_page",
] as const;

export type AnalyticsEventType = (typeof ANALYTICS_EVENT_VALUES)[number];

export const ANALYTICS_EVENTS = {
    PAGE_VIEW: "page_view",
    SEARCH: "search",
    ERROR: "error",
    VIEW_PRODUCT: "view_product",
    ADD_TO_CART: "add_to_cart",
    BEGIN_CHECKOUT: "begin_checkout",
    PURCHASE: "purchase",
    PAGE_LEAVE: "page_leave",
    TIME_ON_PAGE: "time_on_page",
} as const;
