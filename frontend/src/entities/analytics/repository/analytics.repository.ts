import type { AnalyticsEvent } from "@shared/domain/analytics";

import type { AnalyticsStatsDTO, AnalyticsStoredEventDTO } from "@/entities/analytics/api";

export interface AnalyticsRepository {
    track(event: AnalyticsEvent, sessionId?: string): Promise<void>;
    getEvents(limit?: number): Promise<AnalyticsStoredEventDTO[]>;
    getStats(): Promise<AnalyticsStatsDTO>;
}
