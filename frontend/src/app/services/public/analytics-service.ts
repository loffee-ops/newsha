import type { AnalyticsRepository } from "@/entities/analytics/repository";
import { HttpAnalyticsRepository } from "@/entities/analytics/repository";

export function createAnalyticsService(): AnalyticsRepository {
    return new HttpAnalyticsRepository();
}
