import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectCooperationState = (state: RootState) => state.cooperation;

export const selectCooperationItems = createSelector(
    [selectCooperationState],
    (state) => state.items,
);

export const selectCooperationStatus = createSelector(
    [selectCooperationState],
    (state) => state.status,
);

export const selectCooperationError = createSelector(
    [selectCooperationState],
    (state) => state.error,
);

export const selectCooperationSubmitStatus = createSelector(
    [selectCooperationState],
    (state) => state.submitStatus,
);

export const selectCooperationSubmitError = createSelector(
    [selectCooperationState],
    (state) => state.submitError,
);

export const selectIsCooperationSubmitting = createSelector(
    [selectCooperationSubmitStatus],
    (status) => status === "loading",
);

export const selectIsCooperationLoading = createSelector(
    [selectCooperationStatus],
    (status) => status === "loading",
);

export const selectHasCooperations = createSelector(
    [selectCooperationItems],
    (items) => items.length > 0,
);

export { selectCooperationState };
