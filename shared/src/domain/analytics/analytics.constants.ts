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
