import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectRecentlyViewedState = (state: RootState) => state.recentlyViewed;

export const selectRecentlyViewedItems = createSelector(
    [selectRecentlyViewedState],
    (state) => state.items,
);

export const selectRecentlyViewedStatus = createSelector(
    [selectRecentlyViewedState],
    (state) => state.status,
);

export const selectRecentlyViewedError = createSelector(
    [selectRecentlyViewedState],
    (state) => state.error,
);

export const selectAddRecentlyViewedStatus = createSelector(
    [selectRecentlyViewedState],
    (state) => state.addStatus,
);

export const selectAddRecentlyViewedError = createSelector(
    [selectRecentlyViewedState],
    (state) => state.addError,
);

export const selectIsRecentlyViewedLoading = createSelector(
    [selectRecentlyViewedStatus],
    (status) => status === "loading",
);

export const selectIsAddingRecentlyViewed = createSelector(
    [selectAddRecentlyViewedStatus],
    (status) => status === "loading",
);

export const selectHasRecentlyViewed = createSelector(
    [selectRecentlyViewedItems],
    (items) => items.length > 0,
);

export { selectRecentlyViewedState };
