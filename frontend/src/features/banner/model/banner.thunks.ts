import { createAsyncThunk } from "@reduxjs/toolkit";

import type { BannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement } from "@shared/domain/banner";
import type { AppThunkApiConfig } from "@/app/store/store";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchBannersByPlacement = createAsyncThunk<
    readonly BannerDTO[],
    BannerPlacement,
    AppThunkApiConfig
>("banner/fetchByPlacement", async (placement, { extra, rejectWithValue }) => {
    try {
        return await extra.banner.getByPlacement(placement);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load banners"));
    }
});
