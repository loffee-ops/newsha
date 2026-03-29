import { createSlice } from "@reduxjs/toolkit";

import type { ReviewState } from "./review.state";
import {
    approveReview,
    createReview,
    deleteReview,
    fetchAllProductReviews,
    fetchProductReviews,
    rejectReview,
} from "./review.thunks";

const initialState: ReviewState = {
    items: [],
    status: "idle",
    error: null,

    createStatus: "idle",
    createError: null,

    actionStatus: "idle",
    actionError: null,
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetReviewState() {
            return initialState;
        },
        resetCreateReviewState(state) {
            return {
                ...state,
                createStatus: "idle",
                createError: null,
            };
        },
        resetReviewActionState(state) {
            return {
                ...state,
                actionStatus: "idle",
                actionError: null,
            };
        },
        clearReviews(state) {
            return {
                ...state,
                items: [],
                status: "idle",
                error: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductReviews.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load reviews",
                };
            })

            .addCase(fetchAllProductReviews.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAllProductReviews.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAllProductReviews.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load all reviews",
                };
            })

            .addCase(createReview.pending, (state) => {
                return {
                    ...state,
                    createStatus: "loading",
                    createError: null,
                };
            })
            .addCase(createReview.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                    createStatus: "succeeded",
                    createError: null,
                };
            })
            .addCase(createReview.rejected, (state, action) => {
                return {
                    ...state,
                    createStatus: "failed",
                    createError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to create review",
                };
            })

            .addCase(approveReview.pending, (state) => {
                return {
                    ...state,
                    actionStatus: "loading",
                    actionError: null,
                };
            })
            .addCase(approveReview.fulfilled, (state) => {
                return {
                    ...state,
                    actionStatus: "succeeded",
                    actionError: null,
                };
            })
            .addCase(approveReview.rejected, (state, action) => {
                return {
                    ...state,
                    actionStatus: "failed",
                    actionError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to approve review",
                };
            })

            .addCase(rejectReview.pending, (state) => {
                return {
                    ...state,
                    actionStatus: "loading",
                    actionError: null,
                };
            })
            .addCase(rejectReview.fulfilled, (state) => {
                return {
                    ...state,
                    actionStatus: "succeeded",
                    actionError: null,
                };
            })
            .addCase(rejectReview.rejected, (state, action) => {
                return {
                    ...state,
                    actionStatus: "failed",
                    actionError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to reject review",
                };
            })

            .addCase(deleteReview.pending, (state) => {
                return {
                    ...state,
                    actionStatus: "loading",
                    actionError: null,
                };
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                    actionStatus: "succeeded",
                    actionError: null,
                };
            })
            .addCase(deleteReview.rejected, (state, action) => {
                return {
                    ...state,
                    actionStatus: "failed",
                    actionError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete review",
                };
            });
    },
});

export const { resetReviewState, resetCreateReviewState, resetReviewActionState, clearReviews } =
    reviewSlice.actions;

export const reviewReducer = reviewSlice.reducer;
