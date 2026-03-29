import { createSlice } from "@reduxjs/toolkit";

import type { AdminCategoriesState } from "./admin-categories.state";
import {
    createAdminCategory,
    deleteAdminCategory,
    fetchAdminCategories,
    fetchAdminCategoryById,
    setAdminCategoryActive,
    updateAdminCategory,
} from "./admin-categories.thunks";

const initialState: AdminCategoriesState = {
    items: [],
    selected: null,

    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,

    status: "idle",
    error: null,

    createStatus: "idle",
    createError: null,

    updateStatus: "idle",
    updateError: null,

    deleteStatus: "idle",
    deleteError: null,

    toggleStatus: "idle",
    toggleError: null,
};

const adminCategoriesSlice = createSlice({
    name: "adminCategories",
    initialState,
    reducers: {
        clearAdminCategorySelected(state) {
            return {
                ...state,
                selected: null,
            };
        },
        resetAdminCategoryCreateState(state) {
            return {
                ...state,
                createStatus: "idle",
                createError: null,
            };
        },
        resetAdminCategoryUpdateState(state) {
            return {
                ...state,
                updateStatus: "idle",
                updateError: null,
            };
        },
        resetAdminCategoryDeleteState(state) {
            return {
                ...state,
                deleteStatus: "idle",
                deleteError: null,
            };
        },
        resetAdminCategoryToggleState(state) {
            return {
                ...state,
                toggleStatus: "idle",
                toggleError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminCategories.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminCategories.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload.items,
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                    hasNext: action.payload.hasNext,
                    hasPrev: action.payload.hasPrev,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminCategories.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load categories",
                };
            })

            .addCase(fetchAdminCategoryById.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminCategoryById.fulfilled, (state, action) => {
                return {
                    ...state,
                    selected: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminCategoryById.rejected, (state, action) => {
                return {
                    ...state,
                    selected: null,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load category",
                };
            })

            .addCase(createAdminCategory.pending, (state) => {
                return {
                    ...state,
                    createStatus: "loading",
                    createError: null,
                };
            })
            .addCase(createAdminCategory.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                    createStatus: "succeeded",
                    createError: null,
                };
            })
            .addCase(createAdminCategory.rejected, (state, action) => {
                return {
                    ...state,
                    createStatus: "failed",
                    createError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to create category",
                };
            })

            .addCase(updateAdminCategory.pending, (state) => {
                return {
                    ...state,
                    updateStatus: "loading",
                    updateError: null,
                };
            })
            .addCase(updateAdminCategory.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    ),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    updateStatus: "succeeded",
                    updateError: null,
                };
            })
            .addCase(updateAdminCategory.rejected, (state, action) => {
                return {
                    ...state,
                    updateStatus: "failed",
                    updateError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update category",
                };
            })

            .addCase(deleteAdminCategory.pending, (state) => {
                return {
                    ...state,
                    deleteStatus: "loading",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminCategory.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                    selected: state.selected?.id === action.payload ? null : state.selected,
                    deleteStatus: "succeeded",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminCategory.rejected, (state, action) => {
                return {
                    ...state,
                    deleteStatus: "failed",
                    deleteError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete category",
                };
            })

            .addCase(setAdminCategoryActive.pending, (state) => {
                return {
                    ...state,
                    toggleStatus: "loading",
                    toggleError: null,
                };
            })
            .addCase(setAdminCategoryActive.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    ),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    toggleStatus: "succeeded",
                    toggleError: null,
                };
            })
            .addCase(setAdminCategoryActive.rejected, (state, action) => {
                return {
                    ...state,
                    toggleStatus: "failed",
                    toggleError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to change category status",
                };
            });
    },
});

export const {
    clearAdminCategorySelected,
    resetAdminCategoryCreateState,
    resetAdminCategoryUpdateState,
    resetAdminCategoryDeleteState,
    resetAdminCategoryToggleState,
} = adminCategoriesSlice.actions;

export const adminCategoriesReducer = adminCategoriesSlice.reducer;
