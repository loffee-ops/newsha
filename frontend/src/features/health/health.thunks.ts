import { createAsyncThunk } from "@reduxjs/toolkit";

import type { HealthResponse } from "@shared/contracts/health";
import type { AppThunkApiConfig } from "@/app/store/store";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchHealth = createAsyncThunk<HealthResponse, void, AppThunkApiConfig>(
    "health/fetch",
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.health.getHealth();
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load health status"));
        }
    },
    {
        condition: (_, { getState }) => {
            const state = getState() as AppThunkApiConfig["state"];
            return state.health.status !== "loading";
        },
    },
);
