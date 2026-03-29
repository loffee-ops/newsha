import type { AnalyticsEvent } from "@shared/domain/analytics";

export interface AnalyticsSDK {
    track(event: AnalyticsEvent): void;
}
