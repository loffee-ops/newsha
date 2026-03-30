import { createSelector } from "@reduxjs/toolkit";

import { USER_ROLES } from "@shared/domain/user";

import type { RootState } from "@/app/store";

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectSessionLoaded = (state: RootState) => state.auth.sessionLoaded;

export const selectUser = selectAuthUser;

export const selectUserName = createSelector([selectUser], (user) => user?.name ?? null);
export const selectUserEmail = createSelector([selectUser], (user) => user?.email ?? null);
export const selectUserRole = createSelector(
    [selectUser],
    (user) => user?.role ?? USER_ROLES.GUEST,
);

export const selectIsAuthenticated = createSelector([selectUser], (user) => Boolean(user));
export const selectIsAdmin = createSelector([selectUserRole], (role) => role === USER_ROLES.ADMIN);
export const selectIsGuestUser = createSelector(
    [selectUserRole],
    (role) => role === USER_ROLES.GUEST,
);
