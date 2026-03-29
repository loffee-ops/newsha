import type { User } from "@shared/domain/user";
import type { ID } from "@shared/primitives";

import type {
    AdminPaginatedUsersDTO,
    AdminUsersQuery,
    UpdateUserRolePayload,
} from "@/entities/user/types";

const BASE = "/api/admin/users";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: AdminUsersQuery): string {
    if (!params) {
        return "";
    }

    const searchParams = new URLSearchParams();

    if (params.page !== undefined) {
        searchParams.set("page", String(params.page));
    }

    if (params.limit !== undefined) {
        searchParams.set("limit", String(params.limit));
    }

    if (params.search !== undefined && String(params.search).trim()) {
        searchParams.set("search", String(params.search).trim());
    }

    const query = searchParams.toString();

    return query ? `?${query}` : "";
}

export const adminUsersApi = {
    async getAll(params?: AdminUsersQuery): Promise<AdminPaginatedUsersDTO> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            credentials: "include",
        });

        return json<AdminPaginatedUsersDTO>(res);
    },

    async getById(id: ID): Promise<User> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            credentials: "include",
        });

        return json<User>(res);
    },

    async updateRole(payload: UpdateUserRolePayload): Promise<User> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(payload.id))}/role`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: payload.role }),
        });

        return json<User>(res);
    },

    async remove(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },
};
