import { createSlice } from "@reduxjs/toolkit";

import type { Order } from "@shared/domain/order";

import type { AsyncStatus } from "@/shared/config";

import { submitCheckout } from "./checkout.thunks";

export interface CheckoutState {
    order: Order | null;
    status: AsyncStatus;
    error: string | null;
}

const initialState: CheckoutState = {
    order: null,
    status: "idle",
    error: null,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        resetCheckoutState() {
            return initialState;
        },
        clearCheckoutOrder(state) {
            return {
                ...state,
                order: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitCheckout.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(submitCheckout.fulfilled, (state, action) => {
                return {
                    ...state,
                    order: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(submitCheckout.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to submit checkout",
                };
            });
    },
});

export const { resetCheckoutState, clearCheckoutOrder } = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
