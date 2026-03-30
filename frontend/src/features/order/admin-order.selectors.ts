import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectAdminOrderState = (state: RootState) => state.adminOrder;

export const selectAdminOrders = createSelector([selectAdminOrderState], (state) => state.items);

export const selectAdminOrderSelected = createSelector(
    [selectAdminOrderState],
    (state) => state.selected,
);

export const selectAdminOrdersStatus = createSelector(
    [selectAdminOrderState],
    (state) => state.status,
);

export const selectAdminOrdersError = createSelector(
    [selectAdminOrderState],
    (state) => state.error,
);

export const selectAdminOrdersPage = createSelector([selectAdminOrderState], (state) => state.page);

export const selectAdminOrdersLimit = createSelector(
    [selectAdminOrderState],
    (state) => state.limit,
);

export const selectAdminOrdersTotal = createSelector(
    [selectAdminOrderState],
    (state) => state.total,
);

export const selectAdminOrdersTotalPages = createSelector(
    [selectAdminOrderState],
    (state) => state.totalPages,
);

export const selectAdminOrdersHasNext = createSelector(
    [selectAdminOrderState],
    (state) => state.hasNext,
);

export const selectAdminOrdersHasPrev = createSelector(
    [selectAdminOrderState],
    (state) => state.hasPrev,
);

export const selectAdminOrderUpdateStatus = createSelector(
    [selectAdminOrderState],
    (state) => state.updateStatus,
);

export const selectAdminOrderUpdateError = createSelector(
    [selectAdminOrderState],
    (state) => state.updateError,
);

export const selectIsAdminOrdersLoading = createSelector(
    [selectAdminOrdersStatus],
    (status) => status === "loading",
);

export const selectIsAdminOrderUpdating = createSelector(
    [selectAdminOrderUpdateStatus],
    (status) => status === "loading",
);

export const selectHasAdminOrders = createSelector(
    [selectAdminOrders],
    (items) => items.length > 0,
);

export { selectAdminOrderState };
