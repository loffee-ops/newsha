import { USER_ROLES } from "@shared/domain/user";

import { RoleRoute } from "./RoleRoute";

export function AdminRoute() {
    return <RoleRoute allowedRoles={[USER_ROLES.ADMIN]} />;
}
