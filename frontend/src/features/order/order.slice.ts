import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@shared/lib/pagination";

import { toStoreOrders } from "@/entities/order/mapper";

import type { OrderState } from "./order.state";
import { fetchMyOrders } from "./order.thunks";

const initialState: OrderState = {
    current: null,
    list: {
        data: [],
        meta: {
            page: DEFAULT_PAGE,
            limit: DEFAULT_LIMIT,
            total: 0,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
        },
    },
    ordersStatus: "idle",
    ordersError: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearCurrentOrder(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.ordersStatus = "loading";
                state.ordersError = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.ordersStatus = "succeeded";
                state.ordersError = null;
                state.list = {
                    data: toStoreOrders(action.payload.data),
                    meta: action.payload.meta,
                };
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.ordersStatus = "failed";
                state.ordersError = action.payload ?? "Failed to load orders";
            });
    },
});

export const { clearCurrentOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
