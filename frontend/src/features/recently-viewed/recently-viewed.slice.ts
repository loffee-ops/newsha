import { createSlice } from "@reduxjs/toolkit";

import type { RecentlyViewedState } from "./recently-viewed.state";
import { addRecentlyViewed, fetchRecentlyViewed } from "./recently-viewed.thunks";

const initialState: RecentlyViewedState = {
    items: [],
    status: "idle",
    error: null,
    addStatus: "idle",
    addError: null,
};

const recentlyViewedSlice = createSlice({
    name: "recentlyViewed",
    initialState,
    reducers: {
        resetRecentlyViewedState() {
            return initialState;
        },
        resetAddRecentlyViewedState(state) {
            state.addStatus = "idle";
            state.addError = null;
        },
        clearRecentlyViewed(state) {
            state.items = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentlyViewed.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchRecentlyViewed.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to load recently viewed products";
            })

            .addCase(addRecentlyViewed.pending, (state) => {
                state.addStatus = "loading";
                state.addError = null;
            })
            .addCase(addRecentlyViewed.fulfilled, (state) => {
                state.addStatus = "succeeded";
                state.addError = null;
            })
            .addCase(addRecentlyViewed.rejected, (state, action) => {
                state.addStatus = "failed";
                state.addError =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to add recently viewed product";
            });
    },
});

export const { resetRecentlyViewedState, resetAddRecentlyViewedState, clearRecentlyViewed } =
    recentlyViewedSlice.actions;

export const recentlyViewedReducer = recentlyViewedSlice.reducer;
