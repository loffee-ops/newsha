import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CreateReviewDTO } from "@shared/contracts/review/review.dto";
import type { Review } from "@shared/domain/review";
import type { ID } from "@shared/primitives";
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

export const createReview = createAsyncThunk<Review, CreateReviewDTO, AppThunkApiConfig>(
    "review/create",
    async (payload, { extra, rejectWithValue }) => {
        try {
            return await extra.review.createReview(payload);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to create review"));
        }
    },
);

export const fetchProductReviews = createAsyncThunk<readonly Review[], ID, AppThunkApiConfig>(
    "review/fetchProduct",
    async (productId, { extra, rejectWithValue }) => {
        try {
            return await extra.review.getProductReviews(productId);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load reviews"));
        }
    },
);

export const fetchAllProductReviews = createAsyncThunk<readonly Review[], ID, AppThunkApiConfig>(
    "review/fetchAllProduct",
    async (productId, { extra, rejectWithValue }) => {
        try {
            return await extra.review.getAllProductReviews(productId);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load all reviews"));
        }
    },
);

export const approveReview = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "review/approve",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.review.approveReview(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to approve review"));
        }
    },
);

export const rejectReview = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "review/reject",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.review.rejectReview(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to reject review"));
        }
    },
);

export const deleteReview = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "review/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.review.deleteReview(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete review"));
        }
    },
);
