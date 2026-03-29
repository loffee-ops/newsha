import { createSlice } from "@reduxjs/toolkit";

export type ConsultationModalState = "closed" | "form" | "success";

export interface ConsultationUIState {
    modal: ConsultationModalState;
}

const initialState: ConsultationUIState = {
    modal: "closed",
};

const consultationSlice = createSlice({
    name: "consultationUI",
    initialState,
    reducers: {
        openConsultation(state) {
            state.modal = "form";
        },
        closeConsultation(state) {
            state.modal = "closed";
        },
        showConsultationSuccess(state) {
            state.modal = "success";
        },
    },
});

export const { openConsultation, closeConsultation, showConsultationSuccess } =
    consultationSlice.actions;

export const consultationUIReducer = consultationSlice.reducer;
