import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CreateProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

import type { AppThunkApiConfig } from "@/app/store";

import type {
    AdminProductsQuery,
    SetAdminProductActivePayload,
    SetAdminProductFlagsPayload,
    UpdateAdminProductPayload,
    StoreProduct,
    StoreProductPreview,
} from "@/entities/product/types";
import {
    dtoToProduct,
    dtoToProductPreview,
    toStoreProduct,
    toStorePreview,
} from "@/entities/product/mapper";

type FetchAdminProductsResult = {
    items: StoreProductPreview[];
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

export const fetchAdminProducts = createAsyncThunk<
    FetchAdminProductsResult,
    AdminProductsQuery | undefined,
    AppThunkApiConfig
>("adminProducts/fetchAll", async (params, { extra, rejectWithValue }) => {
    try {
        const response = await extra.adminProducts.getAll(params);

        return {
            items: response.data.map((product) => toStorePreview(dtoToProductPreview(product))),
            total: response.meta.total,
            page: response.meta.page,
            limit: response.meta.limit,
            totalPages: response.meta.totalPages,
            hasNext: response.meta.hasNext,
            hasPrev: response.meta.hasPrev,
        };
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load products"));
    }
});

export const fetchAdminProductById = createAsyncThunk<StoreProduct, ID, AppThunkApiConfig>(
    "adminProducts/fetchById",
    async (id, { extra, rejectWithValue }) => {
        try {
            const dto = await extra.adminProducts.getById(id);
            return toStoreProduct(dtoToProduct(dto));
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load product"));
        }
    },
);

export const createAdminProduct = createAsyncThunk<
    StoreProduct,
    CreateProductDTO,
    AppThunkApiConfig
>("adminProducts/create", async (payload, { extra, rejectWithValue }) => {
    try {
        const dto = await extra.adminProducts.create(payload);
        return toStoreProduct(dtoToProduct(dto));
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to create product"));
    }
});

export const updateAdminProduct = createAsyncThunk<
    StoreProduct,
    UpdateAdminProductPayload,
    AppThunkApiConfig
>("adminProducts/update", async (payload, { extra, rejectWithValue }) => {
    try {
        const dto = await extra.adminProducts.update(payload);
        return toStoreProduct(dtoToProduct(dto));
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update product"));
    }
});

export const deleteAdminProduct = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "adminProducts/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.adminProducts.remove(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete product"));
        }
    },
);

export const setAdminProductActive = createAsyncThunk<
    StoreProduct,
    SetAdminProductActivePayload,
    AppThunkApiConfig
>("adminProducts/setActive", async (payload, { extra, rejectWithValue }) => {
    try {
        const dto = await extra.adminProducts.setActive(payload);
        return toStoreProduct(dtoToProduct(dto));
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to change product status"));
    }
});

export const setAdminProductFlags = createAsyncThunk<
    StoreProduct,
    SetAdminProductFlagsPayload,
    AppThunkApiConfig
>("adminProducts/setFlags", async (payload, { extra, rejectWithValue }) => {
    try {
        const dto = await extra.adminProducts.setFlags(payload);
        return toStoreProduct(dtoToProduct(dto));
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to change product flags"));
    }
});
