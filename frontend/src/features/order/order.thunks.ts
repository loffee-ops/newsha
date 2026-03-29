import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

import { checkoutApi, fetchMyOrdersApi } from "@/entities/order/api";
import type { OrdersQuery, PaginatedOrdersDTO } from "@/entities/order/api";

export const checkoutOrder = createAsyncThunk<Order, CheckoutDTO, { rejectValue: string }>(
    "order/checkout",
    async (payload, { rejectWithValue }) => {
        try {
            return await checkoutApi(payload);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to checkout");
        }
    },
);

export const fetchMyOrders = createAsyncThunk<
    PaginatedOrdersDTO,
    OrdersQuery | undefined,
    { rejectValue: string }
>("order/fetchMyOrders", async (params, { rejectWithValue }) => {
    try {
        return await fetchMyOrdersApi(params);
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Failed to load orders");
    }
});
