import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

import type { AppServices } from "@/app/services/app-service";

export const fetchCart = createAsyncThunk<
    readonly CartRow[],
    void,
    { extra: AppServices; rejectValue: string }
>("cart/fetchCart", async (_, { extra, rejectWithValue }) => {
    try {
        return await extra.cart.fetchCart();
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Failed to load cart");
    }
});

export const addToCart = createAsyncThunk<
    readonly CartRow[],
    AddToCartDTO,
    { extra: AppServices; rejectValue: string }
>("cart/addToCart", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.cart.addToCart(payload);
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Failed to add to cart");
    }
});

export const removeFromCart = createAsyncThunk<
    readonly CartRow[],
    RemoveFromCartDTO,
    { extra: AppServices; rejectValue: string }
>("cart/removeFromCart", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.cart.removeFromCart(payload);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Failed to remove from cart",
        );
    }
});

export const clearCart = createAsyncThunk<
    readonly CartRow[],
    void,
    { extra: AppServices; rejectValue: string }
>("cart/clearCart", async (_, { extra, rejectWithValue }) => {
    try {
        return await extra.cart.clearCart();
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Failed to clear cart");
    }
});
