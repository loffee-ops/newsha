import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ID } from "@shared/primitives";

import type { AppThunkApiConfig } from "@/app/store";

import type { StoreProductPreview } from "@/entities/product/types";
import { dtoToProductPreview, toStorePreview } from "@/entities/product/mapper";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchRecentlyViewed = createAsyncThunk<StoreProductPreview[], void, AppThunkApiConfig>(
    "recentlyViewed/fetch",
    async (_, { extra, rejectWithValue }) => {
        try {
            const items = await extra.recentlyViewed.getRecentlyViewed();

            return items.map((product) => toStorePreview(dtoToProductPreview(product)));
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error, "Failed to load recently viewed products"),
            );
        }
    },
);

export const addRecentlyViewed = createAsyncThunk<void, ID, AppThunkApiConfig>(
    "recentlyViewed/add",
    async (productId, { extra, rejectWithValue }) => {
        try {
            await extra.recentlyViewed.addRecentlyViewed(productId);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to add recently viewed product"));
        }
    },
);
