import { createSlice } from "@reduxjs/toolkit";

import type { CategoryDTO } from "@shared/contracts/category";

import type { AsyncStatus } from "@/shared/config";

import { fetchCategories } from "./category.thunks";

export interface CategoryState {
    items: CategoryDTO[];
    status: AsyncStatus;
    error: string | null;
}

const initialState: CategoryState = {
    items: [],
    status: "idle",
    error: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.items = [...action.payload];
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to load categories";
            });
    },
});

export const categoryReducer = categorySlice.reducer;
