import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectSearchState = (state: RootState) => state.search;

export const selectSearchItems = createSelector([selectSearchState], (state) => state.items);
export const selectSearchStatus = createSelector([selectSearchState], (state) => state.status);
export const selectSearchError = createSelector([selectSearchState], (state) => state.error);
export const selectSearchQuery = createSelector([selectSearchState], (state) => state.query);
export const selectIsSearchLoading = createSelector(
    [selectSearchStatus],
    (status) => status === "loading",
);

export const selectHasSearchResults = createSelector(
    [selectSearchItems],
    (items) => items.length > 0,
);

export { selectSearchState };
