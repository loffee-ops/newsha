import { createAsyncThunk } from "@reduxjs/toolkit";

import type { PaginationMetaDTO } from "@shared/contracts/pagination";
import type { Review, ReviewStatus } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

import type { AppThunkApiConfig } from "@/app/store";

import type { AdminReviewsQuery } from "@/entities/review/types";

type FetchAdminReviewsResult = {
    items: readonly Review[];
    meta: PaginationMetaDTO;
};

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchAdminReviews = createAsyncThunk<
    FetchAdminReviewsResult,
    AdminReviewsQuery | undefined,
    AppThunkApiConfig
>("adminReview/fetchAll", async (params, { extra, rejectWithValue }) => {
    try {
        const response = await extra.adminReview.getAll(params);

        return {
            items: response.data,
            meta: response.meta,
        };
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load reviews"));
    }
});

export const fetchAdminReviewById = createAsyncThunk<Review, ID, AppThunkApiConfig>(
    "adminReview/fetchById",
    async (id, { extra, rejectWithValue }) => {
        try {
            return await extra.adminReview.getById(id);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load review"));
        }
    },
);

export const updateAdminReviewStatus = createAsyncThunk<
    Review,
    { id: ID; status: ReviewStatus },
    AppThunkApiConfig
>("adminReview/updateStatus", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminReview.updateStatus(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update review status"));
    }
});

export const deleteAdminReview = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "adminReview/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.adminReview.remove(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete review"));
        }
    },
);
