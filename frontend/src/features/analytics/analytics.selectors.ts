import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

export const selectAnalyticsState = (state: RootState) => state.analytics;

export const selectAnalyticsEvents = createSelector(
    [selectAnalyticsState],
    (analytics) => analytics.events,
);

export const selectAnalyticsStats = createSelector(
    [selectAnalyticsState],
    (analytics) => analytics.stats,
);

export const selectAnalyticsEventsLoading = createSelector(
    [selectAnalyticsState],
    (analytics) => analytics.isLoadingEvents,
);

export const selectAnalyticsStatsLoading = createSelector(
    [selectAnalyticsState],
    (analytics) => analytics.isLoadingStats,
);

export const selectAnalyticsEventsError = createSelector(
    [selectAnalyticsState],
    (analytics) => analytics.eventsError,
);

export const selectAnalyticsStatsError = createSelector(
    [selectAnalyticsState],
    (analytics) => analytics.statsError,
);

export const selectAnalyticsViews = createSelector(
    [selectAnalyticsStats],
    (stats) => stats?.views ?? 0,
);

export const selectAnalyticsCartAdds = createSelector(
    [selectAnalyticsStats],
    (stats) => stats?.cart ?? 0,
);

export const selectAnalyticsPurchases = createSelector(
    [selectAnalyticsStats],
    (stats) => stats?.purchases ?? 0,
);
