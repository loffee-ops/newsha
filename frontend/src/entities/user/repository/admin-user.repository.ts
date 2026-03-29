import type { User, UserRole } from "@shared/domain/user";
import type { ID } from "@shared/primitives";

import type { AdminPaginatedUsersDTO, AdminUsersQuery } from "@/entities/user/types";

export interface AdminUserRepository {
    getAll(params?: AdminUsersQuery): Promise<AdminPaginatedUsersDTO>;
    getById(id: ID): Promise<User>;
    updateRole(payload: { id: ID; role: Exclude<UserRole, "guest"> }): Promise<User>;
    remove(id: ID): Promise<void>;
}
