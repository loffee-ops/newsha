import type { User, UserRole } from "@shared/domain/user";
import type { ID } from "@shared/primitives";

import { type AdminPaginatedUsersDTO, type AdminUsersQuery } from "@/entities/user/types";
import { adminUsersApi } from "@/entities/user/api";
import type { AdminUserRepository } from "./admin-user.repository";

export class HttpAdminUserRepository implements AdminUserRepository {
    getAll(params?: AdminUsersQuery): Promise<AdminPaginatedUsersDTO> {
        return adminUsersApi.getAll(params);
    }

    getById(id: ID): Promise<User> {
        return adminUsersApi.getById(id);
    }

    updateRole(payload: { id: ID; role: Exclude<UserRole, "guest"> }): Promise<User> {
        return adminUsersApi.updateRole(payload);
    }

    async remove(id: ID): Promise<void> {
        await adminUsersApi.remove(id);
    }
}
