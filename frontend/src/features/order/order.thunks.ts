import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppThunkApiConfig } from "@/app/store";

import type { OrdersQuery, PaginatedOrdersDTO } from "@/entities/order/types";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchMyOrders = createAsyncThunk<
    PaginatedOrdersDTO,
    OrdersQuery | undefined,
    AppThunkApiConfig
>("order/fetchMyOrders", async (params, { extra, rejectWithValue }) => {
    try {
        return await extra.order.getMyOrders(params);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load orders"));
    }
});
