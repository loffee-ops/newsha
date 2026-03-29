import type { PaginatedResponse, PaginationQueryDTO } from "@shared/contracts/pagination";
import type { User, UserRole } from "@shared/domain/user";
import type { ID } from "@shared/primitives";

export type AdminUsersQuery = Pick<PaginationQueryDTO, "page" | "limit" | "search">;

export type AdminPaginatedUsersDTO = PaginatedResponse<User>;

export type UpdateUserRolePayload = {
    id: ID;
    role: Exclude<UserRole, "guest">;
};
