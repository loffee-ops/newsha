import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";

const selectAdminReviewState = (state: RootState) => state.adminReview;

export const selectAdminReviews = createSelector([selectAdminReviewState], (state) => state.items);

export const selectAdminReviewSelected = createSelector(
    [selectAdminReviewState],
    (state) => state.selected,
);

export const selectAdminReviewsStatus = createSelector(
    [selectAdminReviewState],
    (state) => state.status,
);

export const selectAdminReviewsError = createSelector(
    [selectAdminReviewState],
    (state) => state.error,
);

export const selectAdminReviewsPage = createSelector(
    [selectAdminReviewState],
    (state) => state.page,
);

export const selectAdminReviewsLimit = createSelector(
    [selectAdminReviewState],
    (state) => state.limit,
);

export const selectAdminReviewsTotal = createSelector(
    [selectAdminReviewState],
    (state) => state.total,
);

export const selectAdminReviewsTotalPages = createSelector(
    [selectAdminReviewState],
    (state) => state.totalPages,
);

export const selectAdminReviewsHasNext = createSelector(
    [selectAdminReviewState],
    (state) => state.hasNext,
);

export const selectAdminReviewsHasPrev = createSelector(
    [selectAdminReviewState],
    (state) => state.hasPrev,
);

export const selectAdminReviewUpdateStatus = createSelector(
    [selectAdminReviewState],
    (state) => state.updateStatus,
);

export const selectAdminReviewUpdateError = createSelector(
    [selectAdminReviewState],
    (state) => state.updateError,
);

export const selectAdminReviewDeleteStatus = createSelector(
    [selectAdminReviewState],
    (state) => state.deleteStatus,
);

export const selectAdminReviewDeleteError = createSelector(
    [selectAdminReviewState],
    (state) => state.deleteError,
);

export const selectIsAdminReviewsLoading = createSelector(
    [selectAdminReviewsStatus],
    (status) => status === "loading",
);

export const selectIsAdminReviewUpdating = createSelector(
    [selectAdminReviewUpdateStatus],
    (status) => status === "loading",
);

export const selectIsAdminReviewDeleting = createSelector(
    [selectAdminReviewDeleteStatus],
    (status) => status === "loading",
);

export const selectHasAdminReviews = createSelector(
    [selectAdminReviews],
    (items) => items.length > 0,
);

export { selectAdminReviewState };
