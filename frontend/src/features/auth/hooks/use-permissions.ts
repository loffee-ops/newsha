import { useCallback } from "react";

import { USER_ROLES } from "@shared/domain/user";
import type { UserRole } from "@shared/domain/user";

import { useAppSelector } from "@/app/store";

import { selectIsAdmin, selectIsAuthenticated, selectUserRole } from "@/features/auth/model";

export function usePermissions() {
    const role = useAppSelector(selectUserRole);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isAdmin = useAppSelector(selectIsAdmin);

    const isGuest = role === USER_ROLES.GUEST;
    const isUser = role === USER_ROLES.USER;

    const hasRole = useCallback((allowed: readonly UserRole[]) => allowed.includes(role), [role]);

    return {
        role,
        isAuthenticated,
        isGuest,
        isUser,
        isAdmin,
        hasRole,
    };
}
