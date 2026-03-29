import { createSlice } from "@reduxjs/toolkit";

import type { ConsultationDTO } from "@shared/contracts/consultation/consultation.dto";
import type { AsyncStatus } from "@/shared/config";

import {
    createConsultation,
    deleteConsultation,
    fetchConsultations,
    updateConsultationStatus,
} from "./consultation.thunks";

export interface ConsultationState {
    items: readonly ConsultationDTO[];
    status: AsyncStatus;
    error: string | null;
    createStatus: AsyncStatus;
    createError: string | null;
}

const initialState: ConsultationState = {
    items: [],
    status: "idle",
    error: null,
    createStatus: "idle",
    createError: null,
};

const consultationSlice = createSlice({
    name: "consultation",
    initialState,
    reducers: {
        resetConsultationCreateState(state) {
            return {
                ...state,
                createStatus: "idle",
                createError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConsultations.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchConsultations.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchConsultations.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load consultations",
                };
            })

            .addCase(createConsultation.pending, (state) => {
                return {
                    ...state,
                    createStatus: "loading",
                    createError: null,
                };
            })
            .addCase(createConsultation.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                    createStatus: "succeeded",
                    createError: null,
                };
            })
            .addCase(createConsultation.rejected, (state, action) => {
                return {
                    ...state,
                    createStatus: "failed",
                    createError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to create consultation",
                };
            })

            .addCase(updateConsultationStatus.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    ),
                };
            })

            .addCase(deleteConsultation.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                };
            });
    },
});

export const { resetConsultationCreateState } = consultationSlice.actions;
export const consultationReducer = consultationSlice.reducer;
