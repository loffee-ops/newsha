import { createSlice } from "@reduxjs/toolkit";

import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";
import type { AsyncStatus } from "@/shared/config";

import { loadBanners } from "./banner.thunks";

export type BannerPlacementState = {
    items: BannerDTO[];
    status: AsyncStatus;
    error: string | null;
};

type BannersState = {
    byPlacement: Partial<Record<BannerPlacement, BannerPlacementState>>;
};

const createPlacementState = (): BannerPlacementState => ({
    items: [],
    status: "idle",
    error: null,
});

const initialState: BannersState = {
    byPlacement: {},
};

function getPlacementState(state: BannersState, placement: BannerPlacement): BannerPlacementState {
    state.byPlacement[placement] ??= createPlacementState();
    return state.byPlacement[placement]!;
}

const bannersSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBanners.pending, (state, action) => {
                const placementState = getPlacementState(state, action.meta.arg);
                placementState.status = "loading";
                placementState.error = null;
            })
            .addCase(loadBanners.fulfilled, (state, action) => {
                const { placement, items } = action.payload;
                const placementState = getPlacementState(state, placement);

                placementState.status = "succeeded";
                placementState.items = items;
                placementState.error = null;
            })
            .addCase(loadBanners.rejected, (state, action) => {
                const placementState = getPlacementState(state, action.meta.arg);

                placementState.status = "failed";
                placementState.error =
                    action.payload ?? action.error.message ?? "Failed to load banners";
            });
    },
});

export const bannersReducer = bannersSlice.reducer;
