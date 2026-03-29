import { createSlice } from "@reduxjs/toolkit";

import type { AdminReviewState } from "./admin-review.state";
import {
    deleteAdminReview,
    fetchAdminReviewById,
    fetchAdminReviews,
    updateAdminReviewStatus,
} from "./admin-review.thunks";

const initialState: AdminReviewState = {
    items: [],
    selected: null,

    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,

    status: "idle",
    error: null,

    updateStatus: "idle",
    updateError: null,

    deleteStatus: "idle",
    deleteError: null,
};

const adminReviewSlice = createSlice({
    name: "adminReview",
    initialState,
    reducers: {
        clearAdminReviewSelected(state) {
            return {
                ...state,
                selected: null,
            };
        },
        resetAdminReviewUpdateState(state) {
            return {
                ...state,
                updateStatus: "idle",
                updateError: null,
            };
        },
        resetAdminReviewDeleteState(state) {
            return {
                ...state,
                deleteStatus: "idle",
                deleteError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminReviews.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminReviews.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload.items,
                    total: action.payload.meta.total,
                    page: action.payload.meta.page,
                    limit: action.payload.meta.limit,
                    totalPages: action.payload.meta.totalPages,
                    hasNext: action.payload.meta.hasNext,
                    hasPrev: action.payload.meta.hasPrev,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminReviews.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load reviews",
                };
            })

            .addCase(fetchAdminReviewById.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminReviewById.fulfilled, (state, action) => {
                return {
                    ...state,
                    selected: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminReviewById.rejected, (state, action) => {
                return {
                    ...state,
                    selected: null,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load review",
                };
            })

            .addCase(updateAdminReviewStatus.pending, (state) => {
                return {
                    ...state,
                    updateStatus: "loading",
                    updateError: null,
                };
            })
            .addCase(updateAdminReviewStatus.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    ),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    updateStatus: "succeeded",
                    updateError: null,
                };
            })
            .addCase(updateAdminReviewStatus.rejected, (state, action) => {
                return {
                    ...state,
                    updateStatus: "failed",
                    updateError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update review status",
                };
            })

            .addCase(deleteAdminReview.pending, (state) => {
                return {
                    ...state,
                    deleteStatus: "loading",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminReview.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                    selected: state.selected?.id === action.payload ? null : state.selected,
                    deleteStatus: "succeeded",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminReview.rejected, (state, action) => {
                return {
                    ...state,
                    deleteStatus: "failed",
                    deleteError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete review",
                };
            });
    },
});

export const {
    clearAdminReviewSelected,
    resetAdminReviewUpdateState,
    resetAdminReviewDeleteState,
} = adminReviewSlice.actions;

export const adminReviewReducer = adminReviewSlice.reducer;
