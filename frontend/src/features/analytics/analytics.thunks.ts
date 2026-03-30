import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppThunkApiConfig } from "@/app/store";

import {
    getErrorMessage,
    type AnalyticsStatsDTO,
    type AnalyticsStoredEventDTO,
} from "@/entities/analytics/api";

import type { AnalyticsStoredEventState } from "./analytics.types";

function toAnalyticsStoredEventState(event: AnalyticsStoredEventDTO): AnalyticsStoredEventState {
    if ("items" in event && Array.isArray(event.items)) {
        return {
            ...event,
            items: event.items.map((item) => ({ ...item })),
        } as AnalyticsStoredEventState;
    }

    return { ...event } as AnalyticsStoredEventState;
}

export const fetchAnalyticsEventsThunk = createAsyncThunk<
    AnalyticsStoredEventState[],
    number | undefined,
    AppThunkApiConfig
>("analytics/fetchEvents", async (limit, { extra, rejectWithValue }) => {
    try {
        const events = await extra.analytics.getEvents(limit);
        return events.map(toAnalyticsStoredEventState);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

export const fetchAnalyticsStatsThunk = createAsyncThunk<
    AnalyticsStatsDTO,
    void,
    AppThunkApiConfig
>("analytics/fetchStats", async (_, { extra, rejectWithValue }) => {
    try {
        return await extra.analytics.getStats();
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
