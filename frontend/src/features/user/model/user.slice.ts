import { createSlice } from "@reduxjs/toolkit";

import type { User } from "@shared/domain/user";
import type { AsyncStatus } from "@/shared/config";

import { changePassword, fetchMe, updateMe } from "./user.thunks";

export interface UserState {
    profile: User | null;
    profileStatus: AsyncStatus;
    profileError: string | null;

    updateStatus: AsyncStatus;
    updateError: string | null;

    changePasswordStatus: AsyncStatus;
    changePasswordError: string | null;
}

const initialState: UserState = {
    profile: null,
    profileStatus: "idle",
    profileError: null,

    updateStatus: "idle",
    updateError: null,

    changePasswordStatus: "idle",
    changePasswordError: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState() {
            return initialState;
        },
        resetUpdateProfileState(state) {
            state.updateStatus = "idle";
            state.updateError = null;
        },
        resetChangePasswordState(state) {
            state.changePasswordStatus = "idle";
            state.changePasswordError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.pending, (state) => {
                state.profileStatus = "loading";
                state.profileError = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.profileStatus = "succeeded";
                state.profileError = null;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.profile = null;
                state.profileStatus = "failed";
                state.profileError =
                    typeof action.payload === "string" ? action.payload : "Failed to load user";
            })

            .addCase(updateMe.pending, (state) => {
                state.updateStatus = "loading";
                state.updateError = null;
            })
            .addCase(updateMe.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.updateStatus = "succeeded";
                state.updateError = null;
            })
            .addCase(updateMe.rejected, (state, action) => {
                state.updateStatus = "failed";
                state.updateError =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to update profile";
            })

            .addCase(changePassword.pending, (state) => {
                state.changePasswordStatus = "loading";
                state.changePasswordError = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.changePasswordStatus = "succeeded";
                state.changePasswordError = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changePasswordStatus = "failed";
                state.changePasswordError =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Failed to change password";
            });
    },
});

export const { resetUserState, resetUpdateProfileState, resetChangePasswordState } =
    userSlice.actions;

export const userReducer = userSlice.reducer;
