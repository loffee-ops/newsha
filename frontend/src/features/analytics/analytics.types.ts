import type { AnalyticsStatsDTO, AnalyticsStoredEventDTO } from "@/entities/analytics/api";

type AnalyticsStoredEventWithMutableItems = AnalyticsStoredEventDTO extends infer T
    ? T extends { items: readonly (infer Item)[] }
        ? Omit<T, "items"> & { items: Item[] }
        : T
    : never;

export type AnalyticsStoredEventState = AnalyticsStoredEventWithMutableItems;

export interface AnalyticsState {
    events: AnalyticsStoredEventState[];
    stats: AnalyticsStatsDTO | null;

    isLoadingEvents: boolean;
    isLoadingStats: boolean;

    eventsError: string | null;
    statsError: string | null;
}
