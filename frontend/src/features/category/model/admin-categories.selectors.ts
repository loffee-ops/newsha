import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectAdminCategoriesState = (state: RootState) => state.adminCategories;

export const selectAdminCategories = createSelector(
    [selectAdminCategoriesState],
    (state) => state.items,
);

export const selectAdminCategorySelected = createSelector(
    [selectAdminCategoriesState],
    (state) => state.selected,
);

export const selectAdminCategoriesStatus = createSelector(
    [selectAdminCategoriesState],
    (state) => state.status,
);

export const selectAdminCategoriesError = createSelector(
    [selectAdminCategoriesState],
    (state) => state.error,
);

export const selectAdminCategoriesPage = createSelector(
    [selectAdminCategoriesState],
    (state) => state.page,
);

export const selectAdminCategoriesLimit = createSelector(
    [selectAdminCategoriesState],
    (state) => state.limit,
);

export const selectAdminCategoriesTotal = createSelector(
    [selectAdminCategoriesState],
    (state) => state.total,
);

export const selectAdminCategoriesTotalPages = createSelector(
    [selectAdminCategoriesState],
    (state) => state.totalPages,
);

export const selectAdminCategoriesHasNext = createSelector(
    [selectAdminCategoriesState],
    (state) => state.hasNext,
);

export const selectAdminCategoriesHasPrev = createSelector(
    [selectAdminCategoriesState],
    (state) => state.hasPrev,
);

export const selectAdminCategoryCreateStatus = createSelector(
    [selectAdminCategoriesState],
    (state) => state.createStatus,
);

export const selectAdminCategoryCreateError = createSelector(
    [selectAdminCategoriesState],
    (state) => state.createError,
);

export const selectAdminCategoryUpdateStatus = createSelector(
    [selectAdminCategoriesState],
    (state) => state.updateStatus,
);

export const selectAdminCategoryUpdateError = createSelector(
    [selectAdminCategoriesState],
    (state) => state.updateError,
);

export const selectAdminCategoryDeleteStatus = createSelector(
    [selectAdminCategoriesState],
    (state) => state.deleteStatus,
);

export const selectAdminCategoryDeleteError = createSelector(
    [selectAdminCategoriesState],
    (state) => state.deleteError,
);

export const selectAdminCategoryToggleStatus = createSelector(
    [selectAdminCategoriesState],
    (state) => state.toggleStatus,
);

export const selectAdminCategoryToggleError = createSelector(
    [selectAdminCategoriesState],
    (state) => state.toggleError,
);

export const selectIsAdminCategoriesLoading = createSelector(
    [selectAdminCategoriesStatus],
    (status) => status === "loading",
);

export const selectHasAdminCategories = createSelector(
    [selectAdminCategories],
    (items) => items.length > 0,
);

export { selectAdminCategoriesState };
