import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ID } from "@shared/primitives";

import { HttpWishlistRepository } from "@/entities/wishlist/repository";

const wishlistRepository = new HttpWishlistRepository();

export const loadWishlist = createAsyncThunk<readonly ID[], void, { rejectValue: string }>(
    "wishlist/load",
    async (_, { rejectWithValue }) => {
        try {
            return await wishlistRepository.getWishlist();
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Failed to load wishlist",
            );
        }
    },
);

export const addWishlistItem = createAsyncThunk<readonly ID[], ID, { rejectValue: string }>(
    "wishlist/addItem",
    async (productId, { rejectWithValue }) => {
        try {
            return await wishlistRepository.addToWishlist(productId);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Failed to add wishlist item",
            );
        }
    },
);

export const removeWishlistItem = createAsyncThunk<readonly ID[], ID, { rejectValue: string }>(
    "wishlist/removeItem",
    async (productId, { rejectWithValue }) => {
        try {
            return await wishlistRepository.removeFromWishlist(productId);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Failed to remove wishlist item",
            );
        }
    },
);

export const toggleWishlistItem = createAsyncThunk<readonly ID[], ID, { rejectValue: string }>(
    "wishlist/toggleItem",
    async (productId, { rejectWithValue }) => {
        try {
            return await wishlistRepository.toggleWishlist(productId);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Failed to update wishlist",
            );
        }
    },
);
