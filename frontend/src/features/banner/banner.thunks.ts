import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";

import { fetchBannersByPlacement } from "@/entities/banner/api/banner.api";

export const loadBanners = createAsyncThunk<
    { placement: BannerPlacement; items: BannerDTO[] },
    BannerPlacement,
    { state: RootState; rejectValue: string }
>(
    "banners/load",
    async (placement, { rejectWithValue }) => {
        try {
            const items = await fetchBannersByPlacement(placement);

            return {
                placement,
                items,
            };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Failed to load banners",
            );
        }
    },
    {
        condition: (placement, { getState }) => {
            const state = getState();
            const placementState = state.banners.byPlacement[placement];

            if (!placementState) return true;
            if (placementState.status === "loading") return false;
            if (placementState.status === "succeeded") return false;

            return true;
        },
    },
);
