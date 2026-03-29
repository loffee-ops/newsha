import type { AnalyticsEvent } from "@shared/domain/analytics";

import {
    analyticsApi,
    type AnalyticsStatsDTO,
    type AnalyticsStoredEventDTO,
} from "@/entities/analytics/api";

import type { AnalyticsRepository } from "./analytics.repository";

export class HttpAnalyticsRepository implements AnalyticsRepository {
    async track(event: AnalyticsEvent, sessionId?: string): Promise<void> {
        await analyticsApi.track(event, sessionId);
    }

    async getEvents(limit = 50): Promise<AnalyticsStoredEventDTO[]> {
        return analyticsApi.getEvents(limit);
    }

    async getStats(): Promise<AnalyticsStatsDTO> {
        return analyticsApi.getStats();
    }
}
