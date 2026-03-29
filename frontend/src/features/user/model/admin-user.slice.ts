import { createSlice } from "@reduxjs/toolkit";

import type { AdminUserState } from "./admin-user.state";
import {
    deleteAdminUser,
    fetchAdminUserById,
    fetchAdminUsers,
    updateAdminUserRole,
} from "./admin-user.thunks";

const initialState: AdminUserState = {
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

    updateStatus: "idle",
    updateError: null,

    deleteStatus: "idle",
    deleteError: null,
};

const adminUserSlice = createSlice({
    name: "adminUser",
    initialState,
    reducers: {
        clearAdminUserSelected(state) {
            return {
                ...state,
                selected: null,
            };
        },
        resetAdminUserUpdateState(state) {
            return {
                ...state,
                updateStatus: "idle",
                updateError: null,
            };
        },
        resetAdminUserDeleteState(state) {
            return {
                ...state,
                deleteStatus: "idle",
                deleteError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminUsers.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
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
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                return {
                    ...state,
                    status: "failed",
                    error:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to load users",
                };
            })

            .addCase(fetchAdminUserById.pending, (state) => {
                return {
                    ...state,
                    status: "loading",
                    error: null,
                };
            })
            .addCase(fetchAdminUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    selected: action.payload,
                    status: "succeeded",
                    error: null,
                };
            })
            .addCase(fetchAdminUserById.rejected, (state, action) => {
                return {
                    ...state,
                    selected: null,
                    status: "failed",
                    error:
                        typeof action.payload === "string" ? action.payload : "Failed to load user",
                };
            })

            .addCase(updateAdminUserRole.pending, (state) => {
                return {
                    ...state,
                    updateStatus: "loading",
                    updateError: null,
                };
            })
            .addCase(updateAdminUserRole.fulfilled, (state, action) => {
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
            .addCase(updateAdminUserRole.rejected, (state, action) => {
                return {
                    ...state,
                    updateStatus: "failed",
                    updateError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to update user role",
                };
            })

            .addCase(deleteAdminUser.pending, (state) => {
                return {
                    ...state,
                    deleteStatus: "loading",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== action.payload),
                    selected: state.selected?.id === action.payload ? null : state.selected,
                    deleteStatus: "succeeded",
                    deleteError: null,
                };
            })
            .addCase(deleteAdminUser.rejected, (state, action) => {
                return {
                    ...state,
                    deleteStatus: "failed",
                    deleteError:
                        typeof action.payload === "string"
                            ? action.payload
                            : "Failed to delete user",
                };
            });
    },
});

export const { clearAdminUserSelected, resetAdminUserUpdateState, resetAdminUserDeleteState } =
    adminUserSlice.actions;

export const adminUserReducer = adminUserSlice.reducer;
