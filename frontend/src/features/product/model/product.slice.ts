import { createSlice } from "@reduxjs/toolkit";

import type { ProductState } from "./product.state";
import {
    fetchProductById,
    fetchProductBySlug,
    fetchProducts,
    searchProducts,
} from "./product.thunks";

const initialState: ProductState = {
    items: [],
    itemsMeta: null,
    searchItems: [],
    selected: null,

    listStatus: "idle",
    searchStatus: "idle",
    selectedStatus: "idle",

    error: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSelected(state) {
            state.selected = null;
            state.selectedStatus = "idle";
        },
        clearSearchResults(state) {
            state.searchItems = [];
            state.searchStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.listStatus = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.listStatus = "succeeded";
                state.items = action.payload.items;
                state.itemsMeta = action.payload.meta;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.listStatus = "failed";
                state.error = action.payload ?? "FAILED_TO_LOAD_PRODUCTS";
            })

            .addCase(fetchProductById.pending, (state) => {
                state.selectedStatus = "loading";
                state.error = null;
                state.selected = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedStatus = "succeeded";
                state.selected = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.selectedStatus = "failed";
                state.error = action.payload ?? "FAILED_TO_LOAD_PRODUCT";
                state.selected = null;
            })

            .addCase(fetchProductBySlug.pending, (state) => {
                state.selectedStatus = "loading";
                state.error = null;
                state.selected = null;
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
                state.selectedStatus = "succeeded";
                state.selected = action.payload;
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                state.selectedStatus = "failed";
                state.error = action.payload ?? "FAILED_TO_LOAD_PRODUCT";
                state.selected = null;
            })

            .addCase(searchProducts.pending, (state) => {
                state.searchStatus = "loading";
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchStatus = "succeeded";
                state.searchItems = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.searchStatus = "failed";
                state.error = action.payload ?? "FAILED_TO_SEARCH_PRODUCTS";
                state.searchItems = [];
            });
    },
});

export const productReducer = productSlice.reducer;
export const { clearSelected, clearSearchResults } = productSlice.actions;
