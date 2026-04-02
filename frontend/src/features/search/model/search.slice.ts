import { createSlice } from "@reduxjs/toolkit";

import type { SearchState } from "./search.state";
import { searchProducts } from "./search.thunks";

const initialState: SearchState = {
    items: [],
    status: "idle",
    error: null,
    query: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        clearSearchState() {
            return initialState;
        },
        clearSearchResults(state) {
            state.items = [];
            state.status = "idle";
            state.error = null;
            state.query = "";
        },
        setSearchQuery(state, action: { payload: string }) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
                state.query = action.meta.arg.query;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                state.items = action.payload.items;
                state.query = action.payload.query;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to search products";
                state.items = [];
            });
    },
});

export const { clearSearchState, clearSearchResults, setSearchQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
