import type { ID } from "@shared/primitives";

import type { User, CurrentUser } from "@shared/domain/user";
import {
    ensureAdminDomain,
    ensureLoggedDomain,
    ensureAdminOrOwnerDomain,
} from "@shared/domain/user";

import { USER_GUARD_TEXT } from "@/entities/user/config";

export function ensureLogged(user: CurrentUser): asserts user is User {
    ensureLoggedDomain(user, USER_GUARD_TEXT.LOGIN_REQUIRED);
}

export function ensureAdmin(user: User): void {
    ensureAdminDomain(user, USER_GUARD_TEXT.ADMIN_ONLY);
}

export function ensureAdminOrOwner(user: User, ownerId: ID): void {
    ensureAdminOrOwnerDomain(user, ownerId, USER_GUARD_TEXT.INSUFFICIENT_RIGHTS);
}
