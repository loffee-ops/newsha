import { client } from "@/app/analytics/core";

import {
    ANALYTICS_EVENTS,
    type AddToCartParams,
    type AnalyticsErrorPayload,
    type BeginCheckoutParams,
    type PurchaseParams,
    type ViewProductParams,
} from "@shared/domain/analytics";

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toAnalyticsErrorPayload(error: unknown): AnalyticsErrorPayload {
    if (error instanceof Error) {
        return {
            message: error.message || "Unknown error",
            ...(error.name ? { name: error.name } : {}),
            ...(error.stack ? { stack: error.stack } : {}),
        };
    }

    if (typeof error === "string") {
        return {
            message: error.trim() || "Unknown error",
        };
    }

    if (isPlainObject(error)) {
        const message =
            typeof error.message === "string" && error.message.trim()
                ? error.message
                : "Unknown error";

        return {
            message,
            ...(typeof error.name === "string" && error.name.trim() ? { name: error.name } : {}),
            ...(typeof error.stack === "string" && error.stack.trim()
                ? { stack: error.stack }
                : {}),
        };
    }

    return {
        message: "Unknown error",
    };
}

export const analytics = {
    pageView(path: string): void {
        client().track({
            type: ANALYTICS_EVENTS.PAGE_VIEW,
            path,
        });
    },

    search(query: string): void {
        client().track({
            type: ANALYTICS_EVENTS.SEARCH,
            query,
        });
    },

    viewProduct(payload: ViewProductParams): void {
        client().track({
            type: ANALYTICS_EVENTS.VIEW_PRODUCT,
            ...payload,
        });
    },

    addToCart(payload: AddToCartParams): void {
        client().track({
            type: ANALYTICS_EVENTS.ADD_TO_CART,
            ...payload,
        });
    },

    beginCheckout(payload: BeginCheckoutParams): void {
        client().track({
            type: ANALYTICS_EVENTS.BEGIN_CHECKOUT,
            ...payload,
        });
    },

    purchase(payload: PurchaseParams): void {
        client().track({
            type: ANALYTICS_EVENTS.PURCHASE,
            ...payload,
        });
    },

    pageLeave(path: string, duration: number): void {
        client().track({
            type: ANALYTICS_EVENTS.PAGE_LEAVE,
            path,
            duration,
        });
    },

    timeOnPage(path: string, duration: number): void {
        client().track({
            type: ANALYTICS_EVENTS.TIME_ON_PAGE,
            path,
            duration,
        });
    },

    error(error: unknown): void {
        client().track({
            type: ANALYTICS_EVENTS.ERROR,
            error: toAnalyticsErrorPayload(error),
        });
    },
};
