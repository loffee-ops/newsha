import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";

const selectAdminProductsState = (state: RootState) => state.adminProducts;

export const selectAdminProducts = createSelector(
    [selectAdminProductsState],
    (state) => state.items,
);

export const selectAdminProductSelected = createSelector(
    [selectAdminProductsState],
    (state) => state.selected,
);

export const selectAdminProductsStatus = createSelector(
    [selectAdminProductsState],
    (state) => state.status,
);

export const selectAdminProductsError = createSelector(
    [selectAdminProductsState],
    (state) => state.error,
);

export const selectAdminProductsPage = createSelector(
    [selectAdminProductsState],
    (state) => state.page,
);

export const selectAdminProductsLimit = createSelector(
    [selectAdminProductsState],
    (state) => state.limit,
);

export const selectAdminProductsTotal = createSelector(
    [selectAdminProductsState],
    (state) => state.total,
);

export const selectAdminProductsTotalPages = createSelector(
    [selectAdminProductsState],
    (state) => state.totalPages,
);

export const selectAdminProductsHasNext = createSelector(
    [selectAdminProductsState],
    (state) => state.hasNext,
);

export const selectAdminProductsHasPrev = createSelector(
    [selectAdminProductsState],
    (state) => state.hasPrev,
);

export const selectAdminProductCreateStatus = createSelector(
    [selectAdminProductsState],
    (state) => state.createStatus,
);

export const selectAdminProductCreateError = createSelector(
    [selectAdminProductsState],
    (state) => state.createError,
);

export const selectAdminProductUpdateStatus = createSelector(
    [selectAdminProductsState],
    (state) => state.updateStatus,
);

export const selectAdminProductUpdateError = createSelector(
    [selectAdminProductsState],
    (state) => state.updateError,
);

export const selectAdminProductDeleteStatus = createSelector(
    [selectAdminProductsState],
    (state) => state.deleteStatus,
);

export const selectAdminProductDeleteError = createSelector(
    [selectAdminProductsState],
    (state) => state.deleteError,
);

export const selectAdminProductToggleActiveStatus = createSelector(
    [selectAdminProductsState],
    (state) => state.toggleActiveStatus,
);

export const selectAdminProductToggleActiveError = createSelector(
    [selectAdminProductsState],
    (state) => state.toggleActiveError,
);

export const selectAdminProductToggleFlagsStatus = createSelector(
    [selectAdminProductsState],
    (state) => state.toggleFlagsStatus,
);

export const selectAdminProductToggleFlagsError = createSelector(
    [selectAdminProductsState],
    (state) => state.toggleFlagsError,
);

export const selectIsAdminProductsLoading = createSelector(
    [selectAdminProductsStatus],
    (status) => status === "loading",
);

export const selectHasAdminProducts = createSelector(
    [selectAdminProducts],
    (items) => items.length > 0,
);

export { selectAdminProductsState };
