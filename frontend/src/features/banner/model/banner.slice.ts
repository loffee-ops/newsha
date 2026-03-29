import { createSlice } from "@reduxjs/toolkit";

import type { BannerState } from "./banner.state";
import { fetchBannersByPlacement } from "./banner.thunks";

const initialState: BannerState = {
    items: [],
    status: "idle",
    error: null,
};

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        clearBanners() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBannersByPlacement.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchBannersByPlacement.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchBannersByPlacement.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load banners",
                };
            });
    },
});

export const { clearBanners } = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
