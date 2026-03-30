import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ID } from "@shared/primitives";

import {
    addWishlistItem,
    loadWishlist,
    removeWishlistItem,
    toggleWishlistItem,
} from "./wishlist.thunks";

export type WishlistState = {
    items: ID[];
    isLoading: boolean;
    error: string | null;
};

const initialState: WishlistState = {
    items: [],
    isLoading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist(state, action: PayloadAction<readonly ID[]>) {
            state.items = [...action.payload];
        },

        clearWishlist(state) {
            state.items = [];
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = [...action.payload];
            })
            .addCase(loadWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? action.error.message ?? "Failed to load wishlist";
            })

            .addCase(addWishlistItem.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addWishlistItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = [...action.payload];
            })
            .addCase(addWishlistItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload ?? action.error.message ?? "Failed to add wishlist item";
            })

            .addCase(removeWishlistItem.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeWishlistItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = [...action.payload];
            })
            .addCase(removeWishlistItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload ?? action.error.message ?? "Failed to remove wishlist item";
            })

            .addCase(toggleWishlistItem.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(toggleWishlistItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = [...action.payload];
            })
            .addCase(toggleWishlistItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? action.error.message ?? "Failed to update wishlist";
            });
    },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
