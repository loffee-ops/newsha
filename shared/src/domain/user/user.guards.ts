import type { ID } from "@shared/primitives";

import { USER_ROLES } from "./user.types";
import type { User, CurrentUser } from "./user.types";

export function ensureLoggedDomain(
    user: CurrentUser,
    message: string = "LOGIN_REQUIRED",
): asserts user is User {
    if (user.role === USER_ROLES.GUEST) {
        throw new Error(message);
    }
}

export function ensureAdminDomain(user: User, message: string = "ADMIN_ONLY"): void {
    if (user.role !== USER_ROLES.ADMIN) {
        throw new Error(message);
    }
}

export function ensureAdminOrOwnerDomain(
    user: User,
    ownerId: ID,
    message: string = "INSUFFICIENT_RIGHTS",
): void {
    if (user.role === USER_ROLES.ADMIN) return;

    if (user.id !== ownerId) {
        throw new Error(message);
    }
}
