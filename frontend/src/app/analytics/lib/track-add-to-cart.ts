import type { AnalyticsSDK } from "@/entities/analytics/types";

import { ANALYTICS_EVENTS, type AddToCartParams } from "@shared/domain/analytics";

export function trackAddToCart(analytics: AnalyticsSDK, params: AddToCartParams): void {
    analytics.track({
        type: ANALYTICS_EVENTS.ADD_TO_CART,
        ...params,
    });
}
