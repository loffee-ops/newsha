import { createSlice } from "@reduxjs/toolkit";

import { AppStatus } from "@/shared/config";

import { initializeApp } from "./initialize-app";

export interface AppState {
    status: AppStatus;
}

const initialState: AppState = {
    status: "idle",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.pending, (state) => {
                state.status = "booting";
            })
            .addCase(initializeApp.fulfilled, (state) => {
                state.status = "ready";
            })
            .addCase(initializeApp.rejected, (state) => {
                state.status = "error";
            });
    },
});

export const appReducer = appSlice.reducer;
