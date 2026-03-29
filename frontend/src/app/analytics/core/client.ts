import type { AnalyticsSDK } from "@/entities/analytics/types";
import { getSessionId, getUTM } from "@/app/analytics/lib";
import { CONSTANTS } from "@/shared/config";
import { analyticsApi } from "@/entities/analytics/api";

import type { AnalyticsEvent, UTM } from "@shared/domain/analytics";

const ANALYTICS_CURRENCY = CONSTANTS.CURRENCY.CODE;

type EnrichedAnalyticsEvent = AnalyticsEvent & {
    ts: number;
    currency: string;
    session_id: string;
    utm: UTM;
};

let instance: AnalyticsSDK | null = null;

export function client(): AnalyticsSDK {
    if (!instance) {
        instance = createClient();
    }

    return instance;
}

function createClient(): AnalyticsSDK {
    const sessionId = getSessionId();

    function sendToVendors(event: EnrichedAnalyticsEvent): void {
        const hasValue = "value" in event && typeof event.value === "number";
        const hasPath = "path" in event && typeof event.path === "string";
        const hasProductId = "productId" in event && typeof event.productId === "string";

        if (typeof window === "undefined") {
            return;
        }

        try {
            window.gtag?.("event", event.type, {
                ...(hasValue ? { value: event.value } : {}),
                currency: event.currency,
                ...(hasPath ? { page_path: event.path } : {}),
                ...(hasProductId ? { item_id: event.productId } : {}),
            });
        } catch {
            // ignore
        }

        try {
            window.fbq?.("trackCustom", event.type, {
                ...(hasValue ? { value: event.value } : {}),
                currency: event.currency,
            });
        } catch {
            // ignore
        }
    }

    function sendToBackend(event: EnrichedAnalyticsEvent): void {
        void analyticsApi.track(event, sessionId).catch(() => {
            // deliberately swallow analytics
        });
    }

    function send(event: AnalyticsEvent): void {
        const enriched: EnrichedAnalyticsEvent = {
            ...event,
            ts: Date.now(),
            currency: ANALYTICS_CURRENCY,
            session_id: sessionId,
            utm: getUTM(),
        };

        sendToVendors(enriched);
        sendToBackend(enriched);

        if (import.meta.env.DEV) {
            console.log("ANALYTICS", enriched);
        }
    }

    return {
        track: send,
    };
}
