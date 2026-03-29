import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CartRow } from "@shared/domain/cart";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

import type { AppServices } from "@/app/services/app-service";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

function toMutableCartRows(rows: readonly CartRow[]): CartRow[] {
    return rows.map((row) => ({ ...row }));
}

export const fetchCart = createAsyncThunk<
    CartRow[],
    void,
    { extra: AppServices; rejectValue: string }
>("cart/fetchCart", async (_, { extra, rejectWithValue }) => {
    try {
        const rows = await extra.cart.getCart();
        return toMutableCartRows(rows);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load cart"));
    }
});

export const addToCart = createAsyncThunk<
    CartRow[],
    AddToCartDTO,
    { extra: AppServices; rejectValue: string }
>("cart/addToCart", async (payload, { extra, rejectWithValue }) => {
    try {
        const rows = await extra.cart.addToCart(payload);
        return toMutableCartRows(rows);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to add to cart"));
    }
});

export const removeFromCart = createAsyncThunk<
    CartRow[],
    RemoveFromCartDTO,
    { extra: AppServices; rejectValue: string }
>("cart/removeFromCart", async (payload, { extra, rejectWithValue }) => {
    try {
        const rows = await extra.cart.removeFromCart(payload);
        return toMutableCartRows(rows);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to remove from cart"));
    }
});

export const clearCart = createAsyncThunk<
    CartRow[],
    void,
    { extra: AppServices; rejectValue: string }
>("cart/clearCart", async (_, { extra, rejectWithValue }) => {
    try {
        const rows = await extra.cart.clearCart();
        return toMutableCartRows(rows);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to clear cart"));
    }
});
