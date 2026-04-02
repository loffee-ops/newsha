import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

type SearchUIState = {
    isOpen: boolean;
};

const initialState: SearchUIState = {
    isOpen: false,
};

const searchUISlice = createSlice({
    name: "searchUI",
    initialState,
    reducers: {
        openSearch(state) {
            state.isOpen = true;
        },
        closeSearch(state) {
            state.isOpen = false;
        },
        toggleSearch(state) {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openSearch, closeSearch, toggleSearch } = searchUISlice.actions;
export const selectIsSearchOpen = (state: RootState) => state.searchUI.isOpen;
export const searchUIReducer = searchUISlice.reducer;
