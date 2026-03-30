import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectOrderState = (state: RootState) => state.order;

export const selectCurrentOrder = createSelector([selectOrderState], (state) => state.current);
export const selectOrdersList = createSelector([selectOrderState], (state) => state.list.data);
export const selectOrdersMeta = createSelector([selectOrderState], (state) => state.list.meta);
export const selectOrdersStatus = createSelector([selectOrderState], (state) => state.ordersStatus);
export const selectOrdersError = createSelector([selectOrderState], (state) => state.ordersError);

export const selectIsOrdersLoading = createSelector(
    [selectOrdersStatus],
    (status) => status === "loading",
);

export const selectHasOrders = createSelector([selectOrdersList], (items) => items.length > 0);
export const selectOrdersPage = createSelector([selectOrdersMeta], (meta) => meta.page);
export const selectOrdersLimit = createSelector([selectOrdersMeta], (meta) => meta.limit);
export const selectOrdersTotal = createSelector([selectOrdersMeta], (meta) => meta.total);
export const selectOrdersTotalPages = createSelector([selectOrdersMeta], (meta) => meta.totalPages);
export const selectOrdersHasNext = createSelector([selectOrdersMeta], (meta) => meta.hasNext);
export const selectOrdersHasPrev = createSelector([selectOrdersMeta], (meta) => meta.hasPrev);

export { selectOrderState };
