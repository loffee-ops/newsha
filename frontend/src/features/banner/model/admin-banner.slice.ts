import { createSlice } from "@reduxjs/toolkit";

import type { AdminBannerState } from "./admin-banner.state";
import {
    deleteAdminBanner,
    fetchAdminBanners,
    updateAdminBanner,
    uploadAdminBanner,
} from "./admin-banner.thunks";

const initialState: AdminBannerState = {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,

    status: "idle",
    error: null,

    uploadStatus: "idle",
    uploadError: null,

    updateStatus: "idle",
    updateError: null,

    deleteStatus: "idle",
    deleteError: null,
};

const adminBannerSlice = createSlice({
    name: "adminBanner",
    initialState,
    reducers: {
        resetAdminBannerState() {
            return initialState;
        },
        resetAdminBannerUploadState(state) {
            return {
                ...state,
                uploadStatus: "idle",
                uploadError: null,
            };
        },
        resetAdminBannerUpdateState(state) {
            return {
                ...state,
                updateStatus: "idle",
                updateError: null,
            };
        },
        resetAdminBannerDeleteState(state) {
            return {
                ...state,
                deleteStatus: "idle",
                deleteError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminBanners.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminBanners.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload.items,
                    total: action.payload.total,
                    page: action.payload.page,
                    limit: action.payload.limit,
                    pages: action.payload.pages,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminBanners.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load banners",
                };
            })

            .addCase(uploadAdminBanner.pending, (state) => {
                return {
                    ...state,
                    uploadStatus: "loading",
                    uploadError: null,
                };
            })
            .addCase(uploadAdminBanner.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                    uploadStatus: "succeeded",
                    uploadError: null,
                };
            })
            .addCase(uploadAdminBanner.rejected, (state, action) => {
                return {
                    ...state,
                    uploadStatus: "failed",
                    uploadError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to upload banner",
                };
            })

            .addCase(updateAdminBanner.pending, (state) => {
                return {
                    ...state,
                    updateStatus: "loading",
                    updateError: null,
                };
            })
            .addCase(updateAdminBanner.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item._id === action.payload._id ? action.payload : item,
                    ),
                    updateStatus: "succeeded",
                    updateError: null,
                };
            })
            .addCase(updateAdminBanner.rejected, (state, action) => {
                return {
                    ...state,
                    updateStatus: "failed",
                    updateError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update banner",
                };
            })

            .addCase(deleteAdminBanner.pending, (state) => {
                return {
                    ...state,
                    deleteStatus: "loading",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminBanner.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item._id !== action.payload),
                    deleteStatus: "succeeded",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminBanner.rejected, (state, action) => {
                return {
                    ...state,
                    deleteStatus: "failed",
                    deleteError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete banner",
                };
            });
    },
});

export const {
    resetAdminBannerState,
    resetAdminBannerUploadState,
    resetAdminBannerUpdateState,
    resetAdminBannerDeleteState,
} = adminBannerSlice.actions;

export const adminBannerReducer = adminBannerSlice.reducer;
