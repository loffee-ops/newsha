import type { AdminUserRepository } from "@/entities/user/repository/admin-user.repository";
import { HttpAdminUserRepository } from "@/entities/user/repository/http-admin-user.repository";

export function createAdminUserService(): AdminUserRepository {
    return new HttpAdminUserRepository();
}
