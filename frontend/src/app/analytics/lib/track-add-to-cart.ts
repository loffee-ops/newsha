import type { AnalyticsSDK } from "@/app/analytics/types";
import type { AddToCartParams } from "@shared/domain/analytics";

export function trackAddToCart(analytics: AnalyticsSDK, params: AddToCartParams) {
    analytics.track({
        type: "add_to_cart",
        ...params,
    });
}
