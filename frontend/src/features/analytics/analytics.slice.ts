import { createSlice } from "@reduxjs/toolkit";

import type { AnalyticsState } from "./analytics.types";
import { fetchAnalyticsEventsThunk, fetchAnalyticsStatsThunk } from "./analytics.thunks";

const initialState: AnalyticsState = {
    events: [],
    stats: null,

    isLoadingEvents: false,
    isLoadingStats: false,

    eventsError: null,
    statsError: null,
};

export const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        clearAnalyticsEvents(state) {
            state.events = [];
        },
        clearAnalyticsErrors(state) {
            state.eventsError = null;
            state.statsError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyticsEventsThunk.pending, (state) => {
                state.isLoadingEvents = true;
                state.eventsError = null;
            })
            .addCase(fetchAnalyticsEventsThunk.fulfilled, (state, action) => {
                state.isLoadingEvents = false;
                state.events = action.payload;
            })
            .addCase(fetchAnalyticsEventsThunk.rejected, (state, action) => {
                state.isLoadingEvents = false;
                state.eventsError =
                    action.payload ?? action.error.message ?? "Failed to load analytics events";
            })

            .addCase(fetchAnalyticsStatsThunk.pending, (state) => {
                state.isLoadingStats = true;
                state.statsError = null;
            })
            .addCase(fetchAnalyticsStatsThunk.fulfilled, (state, action) => {
                state.isLoadingStats = false;
                state.stats = action.payload;
            })
            .addCase(fetchAnalyticsStatsThunk.rejected, (state, action) => {
                state.isLoadingStats = false;
                state.statsError =
                    action.payload ?? action.error.message ?? "Failed to load analytics stats";
            });
    },
});

export const { clearAnalyticsEvents, clearAnalyticsErrors } = analyticsSlice.actions;
export const analyticsReducer = analyticsSlice.reducer;
