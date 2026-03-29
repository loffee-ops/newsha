import { createSlice } from "@reduxjs/toolkit";

import type { CooperationState } from "./cooperation.state";
import {
    submitCooperation,
    fetchCooperations,
    updateCooperationStatus,
    deleteCooperation,
} from "./cooperation.thunks";

const initialState: CooperationState = {
    items: [],
    status: "idle",
    error: null,
    submitStatus: "idle",
    submitError: null,
};

const cooperationSlice = createSlice({
    name: "cooperation",
    initialState,
    reducers: {
        resetCooperationSubmitState(state) {
            return {
                ...state,
                submitStatus: "idle",
                submitError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitCooperation.pending, (state) => {
                return {
                    ...state,
                    submitStatus: "loading",
                    submitError: null,
                };
            })
            .addCase(submitCooperation.fulfilled, (state, action) => {
                return {
                    ...state,
                    submitStatus: "succeeded",
                    submitError: null,
                    items: [action.payload, ...state.items],
                };
            })
            .addCase(submitCooperation.rejected, (state, action) => {
                return {
                    ...state,
                    submitStatus: "failed",
                    submitError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to submit cooperation request",
                };
            })

            .addCase(fetchCooperations.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchCooperations.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "succeeded",
                    error: null,
                    items: action.payload,
                };
            })
            .addCase(fetchCooperations.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load cooperation requests",
                };
            })

            .addCase(updateCooperationStatus.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    ),
                };
            })
            .addCase(updateCooperationStatus.rejected, (state, action) => {
                return {
                    ...state,
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update cooperation status",
                };
            })

            .addCase(deleteCooperation.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                };
            })
            .addCase(deleteCooperation.rejected, (state, action) => {
                return {
                    ...state,
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete cooperation request",
                };
            });
    },
});

export const { resetCooperationSubmitState } = cooperationSlice.actions;
export const cooperationReducer = cooperationSlice.reducer;
