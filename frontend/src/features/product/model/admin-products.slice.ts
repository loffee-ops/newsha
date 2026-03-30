import { createSlice } from "@reduxjs/toolkit";

import { toStorePreview } from "@/entities/product/mapper";

import type { AdminProductsState } from "./admin-products.state";
import {
    createAdminProduct,
    deleteAdminProduct,
    fetchAdminProductById,
    fetchAdminProducts,
    setAdminProductActive,
    setAdminProductFlags,
    updateAdminProduct,
} from "./admin-products.thunks";

const initialState: AdminProductsState = {
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

    toggleActiveStatus: "idle",
    toggleActiveError: null,

    toggleFlagsStatus: "idle",
    toggleFlagsError: null,
};

const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
        clearAdminProductSelected(state) {
            return {
                ...state,
                selected: null,
            };
        },
        resetAdminProductCreateState(state) {
            return {
                ...state,
                createStatus: "idle",
                createError: null,
            };
        },
        resetAdminProductUpdateState(state) {
            return {
                ...state,
                updateStatus: "idle",
                updateError: null,
            };
        },
        resetAdminProductDeleteState(state) {
            return {
                ...state,
                deleteStatus: "idle",
                deleteError: null,
            };
        },
        resetAdminProductToggleActiveState(state) {
            return {
                ...state,
                toggleActiveStatus: "idle",
                toggleActiveError: null,
            };
        },
        resetAdminProductToggleFlagsState(state) {
            return {
                ...state,
                toggleFlagsStatus: "idle",
                toggleFlagsError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
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
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load products",
                };
            })

            .addCase(fetchAdminProductById.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminProductById.fulfilled, (state, action) => {
                return {
                    ...state,
                    selected: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminProductById.rejected, (state, action) => {
                return {
                    ...state,
                    selected: null,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load product",
                };
            })

            .addCase(createAdminProduct.pending, (state) => {
                return {
                    ...state,
                    createStatus: "loading",
                    createError: null,
                };
            })
            .addCase(createAdminProduct.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: [toStorePreview(action.payload), ...state.items],
                    createStatus: "succeeded",
                    createError: null,
                };
            })
            .addCase(createAdminProduct.rejected, (state, action) => {
                return {
                    ...state,
                    createStatus: "failed",
                    createError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to create product",
                };
            })

            .addCase(updateAdminProduct.pending, (state) => {
                return {
                    ...state,
                    updateStatus: "loading",
                    updateError: null,
                };
            })
            .addCase(updateAdminProduct.fulfilled, (state, action) => {
                const preview = toStorePreview(action.payload);

                return {
                    ...state,
                    items: state.items.map((item) => (item.id === preview.id ? preview : item)),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    updateStatus: "succeeded",
                    updateError: null,
                };
            })
            .addCase(updateAdminProduct.rejected, (state, action) => {
                return {
                    ...state,
                    updateStatus: "failed",
                    updateError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update product",
                };
            })

            .addCase(deleteAdminProduct.pending, (state) => {
                return {
                    ...state,
                    deleteStatus: "loading",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminProduct.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                    selected: state.selected?.id === action.payload ? null : state.selected,
                    deleteStatus: "succeeded",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminProduct.rejected, (state, action) => {
                return {
                    ...state,
                    deleteStatus: "failed",
                    deleteError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete product",
                };
            })

            .addCase(setAdminProductActive.pending, (state) => {
                return {
                    ...state,
                    toggleActiveStatus: "loading",
                    toggleActiveError: null,
                };
            })
            .addCase(setAdminProductActive.fulfilled, (state, action) => {
                const preview = toStorePreview(action.payload);

                return {
                    ...state,
                    items: state.items.map((item) => (item.id === preview.id ? preview : item)),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    toggleActiveStatus: "succeeded",
                    toggleActiveError: null,
                };
            })
            .addCase(setAdminProductActive.rejected, (state, action) => {
                return {
                    ...state,
                    toggleActiveStatus: "failed",
                    toggleActiveError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to change product status",
                };
            })

            .addCase(setAdminProductFlags.pending, (state) => {
                return {
                    ...state,
                    toggleFlagsStatus: "loading",
                    toggleFlagsError: null,
                };
            })
            .addCase(setAdminProductFlags.fulfilled, (state, action) => {
                const preview = toStorePreview(action.payload);

                return {
                    ...state,
                    items: state.items.map((item) => (item.id === preview.id ? preview : item)),
                    selected:
                        state.selected?.id === action.payload.id ? action.payload : state.selected,
                    toggleFlagsStatus: "succeeded",
                    toggleFlagsError: null,
                };
            })
            .addCase(setAdminProductFlags.rejected, (state, action) => {
                return {
                    ...state,
                    toggleFlagsStatus: "failed",
                    toggleFlagsError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to change product flags",
                };
            });
    },
});

export const {
    clearAdminProductSelected,
    resetAdminProductCreateState,
    resetAdminProductUpdateState,
    resetAdminProductDeleteState,
    resetAdminProductToggleActiveState,
    resetAdminProductToggleFlagsState,
} = adminProductsSlice.actions;

export const adminProductsReducer = adminProductsSlice.reducer;
