import { createSelector } from "@reduxjs/toolkit";

import { USER_ROLES } from "@shared/domain/user";

import type { RootState } from "@/app/store";

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector([selectAuthState], (auth) => auth.user);
export const selectAuthStatus = createSelector([selectAuthState], (auth) => auth.status);
export const selectAuthError = createSelector([selectAuthState], (auth) => auth.error);
export const selectSessionLoaded = createSelector([selectAuthState], (auth) => auth.sessionLoaded);
export const selectUser = createSelector([selectAuthUser], (user) => user ?? null);
export const selectUserName = createSelector([selectUser], (user) => user?.name ?? null);
export const selectUserEmail = createSelector([selectUser], (user) => user?.email ?? null);
export const selectUserRole = createSelector(
    [selectUser],
    (user) => user?.role ?? USER_ROLES.GUEST,
);

export const selectIsAuthenticated = createSelector([selectAuthUser], (user) => Boolean(user));
export const selectIsAdmin = createSelector([selectUserRole], (role) => role === USER_ROLES.ADMIN);

export const selectIsGuestUser = createSelector(
    [selectUserRole],
    (role) => role === USER_ROLES.GUEST,
);
