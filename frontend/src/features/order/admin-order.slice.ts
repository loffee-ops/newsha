import { createSlice } from "@reduxjs/toolkit";

import type { AdminOrderState } from "./admin-order.state";
import {
    fetchAdminOrderById,
    fetchAdminOrders,
    updateAdminOrderStatus,
} from "./admin-order.thunks";

const initialState: AdminOrderState = {
    items: [],
    selected: null,

    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,

    status: "idle",
    error: null,

    updateStatus: "idle",
    updateError: null,
};

const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState,
    reducers: {
        clearAdminOrderSelected(state) {
            return {
                ...state,
                selected: null,
            };
        },
        resetAdminOrderUpdateState(state) {
            return {
                ...state,
                updateStatus: "idle",
                updateError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminOrders.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload.items,
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                    hasNext: action.payload.hasNext,
                    hasPrev: action.payload.hasPrev,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load orders",
                };
            })

            .addCase(fetchAdminOrderById.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
                return {
                    ...state,
                    selected: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminOrderById.rejected, (state, action) => {
                return {
                    ...state,
                    selected: null,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load order",
                };
            })

            .addCase(updateAdminOrderStatus.pending, (state) => {
                return {
                    ...state,
                    updateStatus: "loading",
                    updateError: null,
                };
            })
            .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    ),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    updateStatus: "succeeded",
                    updateError: null,
                };
            })
            .addCase(updateAdminOrderStatus.rejected, (state, action) => {
                return {
                    ...state,
                    updateStatus: "failed",
                    updateError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update order status",
                };
            });
    },
});

export const { clearAdminOrderSelected, resetAdminOrderUpdateState } = adminOrderSlice.actions;

export const adminOrderReducer = adminOrderSlice.reducer;
