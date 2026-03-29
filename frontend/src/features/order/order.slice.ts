import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@shared/lib/pagination";

import type { OrderState } from "./order.state";
import { checkoutOrder, fetchMyOrders } from "./order.thunks";
import { toStoreOrder, toStoreOrders } from "@/entities/order/mapper";

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
    checkoutStatus: "idle",
    checkoutError: null,
    ordersStatus: "idle",
    ordersError: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetCheckoutState(state) {
            state.checkoutStatus = "idle";
            state.checkoutError = null;
        },
        clearCurrentOrder(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutOrder.pending, (state) => {
                state.checkoutStatus = "loading";
                state.checkoutError = null;
            })
            .addCase(checkoutOrder.fulfilled, (state, action) => {
                state.checkoutStatus = "succeeded";
                state.checkoutError = null;
                state.current = toStoreOrder(action.payload);
            })
            .addCase(checkoutOrder.rejected, (state, action) => {
                state.checkoutStatus = "failed";
                state.checkoutError = action.payload ?? "Failed to checkout";
            })
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

export const { resetCheckoutState, clearCurrentOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
