import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

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

export const submitCheckout = createAsyncThunk<Order, CheckoutDTO, AppThunkApiConfig>(
    "checkout/submit",
    async (payload, { extra, rejectWithValue }) => {
        try {
            return await extra.checkout.submitCheckout(payload);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to submit checkout"));
        }
    },
);
