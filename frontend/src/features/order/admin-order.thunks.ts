import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ID } from "@shared/primitives";
import type { OrderStatus } from "@shared/domain/order";
import type { AppThunkApiConfig } from "@/app/store/store";

import type { AdminOrdersQuery } from "@/entities/order/types";
import type { StoreOrder } from "@/entities/order/types/order.store.types";
import { toStoreOrder, toStoreOrders } from "@/entities/order/mapper";

type FetchAdminOrdersResult = {
    items: StoreOrder[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchAdminOrders = createAsyncThunk<
    FetchAdminOrdersResult,
    AdminOrdersQuery | undefined,
    AppThunkApiConfig
>("adminOrder/fetchAll", async (params, { extra, rejectWithValue }) => {
    try {
        const response = await extra.adminOrder.getAll(params);

        return {
            items: toStoreOrders(response.data),
            total: response.meta.total,
            page: response.meta.page,
            limit: response.meta.limit,
            totalPages: response.meta.totalPages,
            hasNext: response.meta.hasNext,
            hasPrev: response.meta.hasPrev,
        };
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load orders"));
    }
});

export const fetchAdminOrderById = createAsyncThunk<StoreOrder, ID, AppThunkApiConfig>(
    "adminOrder/fetchById",
    async (id, { extra, rejectWithValue }) => {
        try {
            const order = await extra.adminOrder.getById(id);
            return toStoreOrder(order);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load order"));
        }
    },
);

export const updateAdminOrderStatus = createAsyncThunk<
    StoreOrder,
    { id: ID; status: OrderStatus },
    AppThunkApiConfig
>("adminOrder/updateStatus", async (payload, { extra, rejectWithValue }) => {
    try {
        const order = await extra.adminOrder.updateStatus(payload);
        return toStoreOrder(order);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update order status"));
    }
});
