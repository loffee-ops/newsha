import { createAsyncThunk } from "@reduxjs/toolkit";

import type { User, UserRole } from "@shared/domain/user";
import type { ID } from "@shared/primitives";

import type { AppThunkApiConfig } from "@/app/store";

import type { AdminUsersQuery } from "@/entities/user/types";

type FetchAdminUsersResult = {
    items: readonly User[];
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

export const fetchAdminUsers = createAsyncThunk<
    FetchAdminUsersResult,
    AdminUsersQuery | undefined,
    AppThunkApiConfig
>("adminUser/fetchAll", async (params, { extra, rejectWithValue }) => {
    try {
        const response = await extra.adminUser.getAll(params);

        return {
            items: response.data,
            total: response.meta.total,
            page: response.meta.page,
            limit: response.meta.limit,
            totalPages: response.meta.totalPages,
            hasNext: response.meta.hasNext,
            hasPrev: response.meta.hasPrev,
        };
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to load users"));
    }
});

export const fetchAdminUserById = createAsyncThunk<User, ID, AppThunkApiConfig>(
    "adminUser/fetchById",
    async (id, { extra, rejectWithValue }) => {
        try {
            return await extra.adminUser.getById(id);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load user"));
        }
    },
);

export const updateAdminUserRole = createAsyncThunk<
    User,
    { id: ID; role: Exclude<UserRole, "guest"> },
    AppThunkApiConfig
>("adminUser/updateRole", async (payload, { extra, rejectWithValue }) => {
    try {
        return await extra.adminUser.updateRole(payload);
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Failed to update user role"));
    }
});

export const deleteAdminUser = createAsyncThunk<ID, ID, AppThunkApiConfig>(
    "adminUser/delete",
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.adminUser.remove(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to delete user"));
        }
    },
);
