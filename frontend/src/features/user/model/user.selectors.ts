import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store/store";

const selectUserState = (state: RootState) => state.user;

export const selectUserProfile = createSelector([selectUserState], (state) => state.profile);

export const selectUserProfileStatus = createSelector(
    [selectUserState],
    (state) => state.profileStatus,
);

export const selectUserProfileError = createSelector(
    [selectUserState],
    (state) => state.profileError,
);

export const selectUpdateProfileStatus = createSelector(
    [selectUserState],
    (state) => state.updateStatus,
);

export const selectUpdateProfileError = createSelector(
    [selectUserState],
    (state) => state.updateError,
);

export const selectChangePasswordStatus = createSelector(
    [selectUserState],
    (state) => state.changePasswordStatus,
);

export const selectChangePasswordError = createSelector(
    [selectUserState],
    (state) => state.changePasswordError,
);

export const selectIsUserProfileLoading = createSelector(
    [selectUserProfileStatus],
    (status) => status === "loading",
);

export const selectIsUpdatingProfile = createSelector(
    [selectUpdateProfileStatus],
    (status) => status === "loading",
);

export const selectIsChangingPassword = createSelector(
    [selectChangePasswordStatus],
    (status) => status === "loading",
);

export { selectUserState };
