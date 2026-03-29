import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppThunkApiConfig } from "@/app/store/store";
import type {
    AdminBannerListResponse,
    AdminBannerResponse,
    DeleteBannerPayload,
    UpdateBannerPayload,
    UploadBannerPayload,
} from "@/entities/banner/types";

type FetchAdminBannersResult = AdminBannerListResponse;

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchAdminBanners = createAsyncThunk<
    FetchAdminBannersResult,
    { page?: number; limit?: number } | undefined,
    AppThunkApiConfig
>("adminBanner/fetchAll", async (params, { extra, rejectWithValue }) => {
    try {
        return await extra.adminBanner.getAll(params);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load banners"));
    }
});

export const uploadAdminBanner = createAsyncThunk<
    AdminBannerResponse,
    UploadBannerPayload,
    AppThunkApiConfig
>("adminBanner/upload", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminBanner.upload(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to upload banner"));
    }
});

export const updateAdminBanner = createAsyncThunk<
    AdminBannerResponse,
    UpdateBannerPayload,
    AppThunkApiConfig
>("adminBanner/update", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminBanner.update(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update banner"));
    }
});

export const deleteAdminBanner = createAsyncThunk<string, DeleteBannerPayload, AppThunkApiConfig>(
    "adminBanner/delete",
    async (payload, { extra, rejectWithValue }) => {
        try {
            await extra.adminBanner.remove(payload);
            return payload.id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete banner"));
        }
    },
);
