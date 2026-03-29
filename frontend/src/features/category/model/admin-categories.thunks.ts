import { createAsyncThunk } from "@reduxjs/toolkit";

import type { CategoryDTO } from "@shared/contracts/category";
import type { ID } from "@shared/primitives";
import type { AppThunkApiConfig } from "@/app/store/store";

import type {
    AdminCategoryListResponse,
    CreateCategoryPayload,
    SetCategoryActivePayload,
    UpdateCategoryPayload,
} from "@/entities/category/types";

function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallback;
}

export const fetchAdminCategories = createAsyncThunk<
    AdminCategoryListResponse,
    { page?: number; limit?: number } | undefined,
    AppThunkApiConfig
>("adminCategories/fetchAll", async (params, { extra, rejectWithValue }) => {
    try {
        return await extra.adminCategories.getAll(params);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load categories"));
    }
});

export const fetchAdminCategoryById = createAsyncThunk<CategoryDTO, ID, AppThunkApiConfig>(
    "adminCategories/fetchById",
    async (id, { extra, rejectWithValue }) => {
        try {
            return await extra.adminCategories.getById(id);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load category"));
        }
    },
);

export const createAdminCategory = createAsyncThunk<
    CategoryDTO,
    CreateCategoryPayload,
    AppThunkApiConfig
>("adminCategories/create", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminCategories.create(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to create category"));
    }
});

export const updateAdminCategory = createAsyncThunk<
    CategoryDTO,
    UpdateCategoryPayload,
    AppThunkApiConfig
>("adminCategories/update", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminCategories.update(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update category"));
    }
});

export const deleteAdminCategory = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "adminCategories/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.adminCategories.remove(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete category"));
        }
    },
);

export const setAdminCategoryActive = createAsyncThunk<
    CategoryDTO,
    SetCategoryActivePayload,
    AppThunkApiConfig
>("adminCategories/setActive", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminCategories.setActive(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to change category status"));
    }
});
