import { client } from "@/app/analytics/core";

import type {
    AddToCartParams,
    BeginCheckoutParams,
    PurchaseParams,
    ViewProductParams,
} from "@shared/domain/analytics";

export const analyticsApi = {
    pageView(path: string) {
        client().track({
            type: "page_view",
            path,
        });
    },

    search(query: string) {
        client().track({
            type: "search",
            query,
        });
    },

    viewProduct(payload: ViewProductParams) {
        client().track({
            type: "view_product",
            ...payload,
        });
    },

    addToCart(payload: AddToCartParams) {
        client().track({
            type: "add_to_cart",
            ...payload,
        });
    },

    beginCheckout(payload: BeginCheckoutParams) {
        client().track({
            type: "begin_checkout",
            ...payload,
        });
    },

    purchase(payload: PurchaseParams) {
        client().track({
            type: "purchase",
            ...payload,
        });
    },

    pageLeave(path: string, duration: number) {
        client().track({
            type: "page_leave",
            path,
            duration,
        });
    },

    timeOnPage(path: string, duration: number) {
        client().track({
            type: "time_on_page",
            path,
            duration,
        });
    },

    error(error: unknown) {
        client().track({
            type: "error",
            error,
        });
    },
};
