import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthSession } from "@shared/domain/auth";
import type { User } from "@shared/domain/user";

import type { AsyncStatus } from "@/shared/config";

import { AUTH_TEXT } from "@/features/auth/config";

import { restoreSession, login, register, logout, loginWithGoogle } from "./auth.thunks";

export interface AuthState {
    user: User | null;
    status: AsyncStatus;
    error: string | null;
    sessionLoaded: boolean;
}

const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null,
    sessionLoaded: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthSession | null>) {
            state.user = action.payload?.user ?? null;
            state.error = null;
        },

        clearAuth(state) {
            state.user = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(restoreSession.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.user = action.payload?.user ?? null;
                state.status = "idle";
                state.error = null;
                state.sessionLoaded = true;
            })
            .addCase(restoreSession.rejected, (state, action) => {
                state.user = null;
                state.status = "failed";
                state.error = action.payload ?? action.error.message ?? AUTH_TEXT.RESTORE_ERROR;
                state.sessionLoaded = true;
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error.message ?? AUTH_TEXT.LOGIN_ERROR;
            })
            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error.message ?? AUTH_TEXT.REGISTER_ERROR;
            })
            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.status = "idle";
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.user = null;
                state.status = "idle";
                state.error = action.payload ?? action.error.message ?? null;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error.message ?? AUTH_TEXT.LOGIN_ERROR;
            });
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
