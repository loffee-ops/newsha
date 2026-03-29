import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";

const selectAdminUserState = (state: RootState) => state.adminUser;

export const selectAdminUsers = createSelector([selectAdminUserState], (state) => state.items);

export const selectAdminUserSelected = createSelector(
    [selectAdminUserState],
    (state) => state.selected,
);

export const selectAdminUsersStatus = createSelector(
    [selectAdminUserState],
    (state) => state.status,
);

export const selectAdminUsersError = createSelector([selectAdminUserState], (state) => state.error);

export const selectAdminUsersPage = createSelector([selectAdminUserState], (state) => state.page);

export const selectAdminUsersLimit = createSelector([selectAdminUserState], (state) => state.limit);

export const selectAdminUsersTotal = createSelector([selectAdminUserState], (state) => state.total);

export const selectAdminUsersTotalPages = createSelector(
    [selectAdminUserState],
    (state) => state.totalPages,
);

export const selectAdminUsersHasNext = createSelector(
    [selectAdminUserState],
    (state) => state.hasNext,
);

export const selectAdminUsersHasPrev = createSelector(
    [selectAdminUserState],
    (state) => state.hasPrev,
);

export const selectAdminUserUpdateStatus = createSelector(
    [selectAdminUserState],
    (state) => state.updateStatus,
);

export const selectAdminUserUpdateError = createSelector(
    [selectAdminUserState],
    (state) => state.updateError,
);

export const selectAdminUserDeleteStatus = createSelector(
    [selectAdminUserState],
    (state) => state.deleteStatus,
);

export const selectAdminUserDeleteError = createSelector(
    [selectAdminUserState],
    (state) => state.deleteError,
);

export const selectIsAdminUsersLoading = createSelector(
    [selectAdminUsersStatus],
    (status) => status === "loading",
);

export const selectIsAdminUserUpdating = createSelector(
    [selectAdminUserUpdateStatus],
    (status) => status === "loading",
);

export const selectIsAdminUserDeleting = createSelector(
    [selectAdminUserDeleteStatus],
    (status) => status === "loading",
);

export const selectHasAdminUsers = createSelector([selectAdminUsers], (items) => items.length > 0);

export { selectAdminUserState };
