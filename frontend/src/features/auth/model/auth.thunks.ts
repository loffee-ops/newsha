import { createAsyncThunk } from "@reduxjs/toolkit";

import type { LoginDTO, RegisterDTO } from "@shared/contracts/auth";
import type { AuthSession } from "@shared/domain/auth";

import type { AppThunkApiConfig } from "@/app/store/store";
import { AUTH_TEXT } from "@/features/auth/config";

export const restoreSession = createAsyncThunk<AuthSession | null, void, AppThunkApiConfig>(
    "auth/restoreSession",
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.auth.restoreSession();
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : AUTH_TEXT.RESTORE_ERROR,
            );
        }
    },
);

export const login = createAsyncThunk<AuthSession, LoginDTO, AppThunkApiConfig>(
    "auth/login",
    async (dto, { extra, rejectWithValue }) => {
        try {
            return await extra.auth.login(dto);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : AUTH_TEXT.LOGIN_ERROR);
        }
    },
);

export const register = createAsyncThunk<AuthSession, RegisterDTO, AppThunkApiConfig>(
    "auth/register",
    async (dto, { extra, rejectWithValue }) => {
        try {
            return await extra.auth.register(dto);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : AUTH_TEXT.REGISTER_ERROR,
            );
        }
    },
);

export const logout = createAsyncThunk<void, void, AppThunkApiConfig>(
    "auth/logout",
    async (_, { extra, rejectWithValue }) => {
        try {
            await extra.auth.logout();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : AUTH_TEXT.LOGOUT_ERROR);
        }
    },
);
