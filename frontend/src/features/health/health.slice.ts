import { createSlice } from "@reduxjs/toolkit";

import type { HealthResponse } from "@shared/contracts/health";

import type { AsyncStatus } from "@/shared/config";

import { fetchHealth } from "./health.thunks";

export interface HealthState {
    data: HealthResponse | null;
    status: AsyncStatus;
    error: string | null;
}

const initialState: HealthState = {
    data: null,
    status: "idle",
    error: null,
};

const healthSlice = createSlice({
    name: "health",
    initialState,
    reducers: {
        resetHealthState() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHealth.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchHealth.fulfilled, (state, action) => {
                return {
                    ...state,
                    data: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchHealth.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load health status",
                };
            });
    },
});

export const { resetHealthState } = healthSlice.actions;
export const healthReducer = healthSlice.reducer;
