import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

export interface CartUIState {
    isOpen: boolean;
}

const initialState: CartUIState = {
    isOpen: false,
};

const cartUISlice = createSlice({
    name: "cartUI",
    initialState,
    reducers: {
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openCart, closeCart, toggleCart } = cartUISlice.actions;

export const selectIsCartOpen = (state: RootState) => state.cartUI.isOpen;

export const cartUIReducer = cartUISlice.reducer;
