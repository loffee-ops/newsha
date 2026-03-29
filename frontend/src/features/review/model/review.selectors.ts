import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";

const selectReviewState = (state: RootState) => state.review;

export const selectReviews = createSelector([selectReviewState], (state) => state.items);
export const selectReviewsStatus = createSelector([selectReviewState], (state) => state.status);
export const selectReviewsError = createSelector([selectReviewState], (state) => state.error);

export const selectCreateReviewStatus = createSelector(
    [selectReviewState],
    (state) => state.createStatus,
);

export const selectCreateReviewError = createSelector(
    [selectReviewState],
    (state) => state.createError,
);

export const selectReviewActionStatus = createSelector(
    [selectReviewState],
    (state) => state.actionStatus,
);

export const selectReviewActionError = createSelector(
    [selectReviewState],
    (state) => state.actionError,
);

export const selectIsReviewsLoading = createSelector(
    [selectReviewsStatus],
    (status) => status === "loading",
);

export const selectIsCreatingReview = createSelector(
    [selectCreateReviewStatus],
    (status) => status === "loading",
);

export const selectIsReviewActionLoading = createSelector(
    [selectReviewActionStatus],
    (status) => status === "loading",
);

export const selectHasReviews = createSelector([selectReviews], (items) => items.length > 0);

export { selectReviewState };
