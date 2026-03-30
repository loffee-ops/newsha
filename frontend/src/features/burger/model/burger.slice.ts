import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BurgerSection } from "@/features/burger/config";

export interface BurgerState {
    open: boolean;
    expanded: BurgerSection | null;
}

const initialState: BurgerState = {
    open: false,
    expanded: null,
};

const burgerSlice = createSlice({
    name: "burgerUI",
    initialState,
    reducers: {
        openBurger(state, action: PayloadAction<BurgerSection | null | undefined>) {
            state.open = true;

            if (action.payload !== undefined) {
                state.expanded = action.payload;
            }
        },

        closeBurger(state) {
            state.open = false;
            state.expanded = null;
        },

        toggleBurger(state) {
            const nextOpen = !state.open;
            state.open = nextOpen;

            if (!nextOpen) {
                state.expanded = null;
            }
        },

        setExpanded(state, action: PayloadAction<BurgerSection | null>) {
            state.expanded = action.payload;
        },

        toggleExpanded(state, action: PayloadAction<BurgerSection>) {
            state.expanded = state.expanded === action.payload ? null : action.payload;
        },
    },
});

export const { openBurger, closeBurger, toggleBurger, setExpanded, toggleExpanded } =
    burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;
