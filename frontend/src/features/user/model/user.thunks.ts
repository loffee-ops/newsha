import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ChangePasswordDTO, UpdateProfileDTO } from "@shared/contracts/user";
import type { User } from "@shared/domain/user";

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

export const fetchMe = createAsyncThunk<User, void, AppThunkApiConfig>(
    "user/fetchMe",
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.user.getMe();
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to load user"));
        }
    },
);

export const updateMe = createAsyncThunk<User, UpdateProfileDTO, AppThunkApiConfig>(
    "user/updateMe",
    async (dto, { extra, rejectWithValue, dispatch }) => {
        try {
            const user = await extra.user.updateMe(dto);
            dispatch({ type: "auth/setAuth", payload: { user } });
            return user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to update profile"));
        }
    },
);

export const changePassword = createAsyncThunk<void, ChangePasswordDTO, AppThunkApiConfig>(
    "user/changePassword",
    async (dto, { extra, rejectWithValue }) => {
        try {
            await extra.user.changePassword(dto);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to change password"));
        }
    },
);
