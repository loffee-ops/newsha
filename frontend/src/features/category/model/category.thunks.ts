import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CategoryDTO } from "@shared/contracts/category";

import type { AppThunkApiConfig } from "@/app/store";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchCategories = createAsyncThunk<readonly CategoryDTO[], void, AppThunkApiConfig>(
    "categories/fetch",
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.categories.getCategories();
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load categories"));
        }
    },
    {
        condition: (_, { getState }) => {
            const state = getState() as AppThunkApiConfig["state"];
            return state.category.status !== "loading" && state.category.status !== "succeeded";
        },
    },
);
