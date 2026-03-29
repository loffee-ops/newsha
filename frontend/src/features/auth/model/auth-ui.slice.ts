import { createSlice } from "@reduxjs/toolkit";

export type AuthModalMode = "login" | "register" | null;

type AuthUIState = {
    modalMode: AuthModalMode;
};

const initialState: AuthUIState = {
    modalMode: null,
};

const authUISlice = createSlice({
    name: "authUI",
    initialState,
    reducers: {
        openLoginModal(state) {
            state.modalMode = "login";
        },
        openRegisterModal(state) {
            state.modalMode = "register";
        },
        closeAuthModal(state) {
            state.modalMode = null;
        },
    },
});

export const { openLoginModal, openRegisterModal, closeAuthModal } = authUISlice.actions;
export const authUIReducer = authUISlice.reducer;
