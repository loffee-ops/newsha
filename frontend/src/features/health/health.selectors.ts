import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

const selectHealthState = (state: RootState) => state.health;

export const selectHealthData = (state: RootState) => selectHealthState(state).data;
export const selectHealthStatus = (state: RootState) => selectHealthState(state).status;
export const selectHealthError = (state: RootState) => selectHealthState(state).error;

export const selectIsHealthLoading = createSelector(
    [selectHealthStatus],
    (status) => status === "loading",
);

export const selectIsHealthReady = createSelector(
    [selectHealthStatus, selectHealthData],
    (status, data) => status === "succeeded" && data !== null,
);
