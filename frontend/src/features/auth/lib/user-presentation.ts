import { USER_ROLES, type UserRole } from "@shared/domain/user";

export function getUserStatusLabel(role: UserRole = USER_ROLES.GUEST) {
    switch (role) {
        case USER_ROLES.ADMIN:
            return "Admin";

        case USER_ROLES.USER:
            return "Мій кабінет";

        case USER_ROLES.GUEST:
        default:
            return "Увійти";
    }
}

export function getUserDashboardPath(role: UserRole = USER_ROLES.GUEST) {
    switch (role) {
        case USER_ROLES.ADMIN:
            return "/admin";

        case USER_ROLES.USER:
            return "/account";

        case USER_ROLES.GUEST:
        default:
            return "/login";
    }
}
