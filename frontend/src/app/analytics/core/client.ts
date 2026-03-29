import type { AnalyticsSDK } from "@/app/analytics/types";
import { getSessionId, getUTM } from "@/app/analytics/lib";
import { CONSTANTS } from "@/shared/config";

import type { AnalyticsEvent } from "@shared/domain/analytics";

const ANALYTICS_CURRENCY = CONSTANTS.CURRENCY.CODE;

let instance: AnalyticsSDK | null = null;

export function client(): AnalyticsSDK {
    if (!instance) {
        instance = createClient();
    }

    return instance;
}

function createClient(): AnalyticsSDK {
    const sessionId = getSessionId();

    function send(event: AnalyticsEvent) {
        const enriched = {
            ...event,
            ts: Date.now(),
            currency: ANALYTICS_CURRENCY,
            session_id: sessionId,
            utm: getUTM(),
        };

        const hasValue = "value" in enriched;

        if (typeof window !== "undefined") {
            window.gtag?.("event", enriched.type, {
                ...(hasValue && { value: enriched.value }),
                currency: enriched.currency,
                ...("path" in enriched && { page_path: enriched.path }),
                ...("productId" in enriched && { item_id: enriched.productId }),
            });

            window.fbq?.("trackCustom", enriched.type, {
                ...(hasValue && { value: enriched.value }),
                currency: enriched.currency,
            });
        }

        if (import.meta.env.DEV) {
            console.log("ANALYTICS", enriched);
        }
    }

    return {
        track: send,
    };
}
