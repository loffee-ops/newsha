import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";

import type { CartRow } from "@shared/domain/cart";

import type { CartState } from "./cart.state";
import { fetchCart, addToCart, removeFromCart, clearCart } from "./cart.thunks";

const initialState: CartState = {
    rows: [],
    status: "idle",
    error: null,
};

function setPending(state: CartState) {
    state.status = "loading";
    state.error = null;
}

function setFulfilled(state: CartState, action: PayloadAction<readonly CartRow[]>) {
    state.rows = action.payload;
    state.status = "succeeded";
    state.error = null;
}

function setRejected(
    state: CartState,
    action: PayloadAction<string | undefined, string, unknown, SerializedError>,
) {
    state.status = "failed";
    state.error = action.payload ?? action.error.message ?? "Cart request failed";
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, setPending)
            .addCase(fetchCart.fulfilled, setFulfilled)
            .addCase(fetchCart.rejected, setRejected)

            .addCase(addToCart.pending, setPending)
            .addCase(addToCart.fulfilled, setFulfilled)
            .addCase(addToCart.rejected, setRejected)

            .addCase(removeFromCart.pending, setPending)
            .addCase(removeFromCart.fulfilled, setFulfilled)
            .addCase(removeFromCart.rejected, setRejected)

            .addCase(clearCart.pending, setPending)
            .addCase(clearCart.fulfilled, setFulfilled)
            .addCase(clearCart.rejected, setRejected);
    },
});

export const cartReducer = cartSlice.reducer;
