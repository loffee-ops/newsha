import type { Order } from "@shared/domain/order";
import type { ID } from "@shared/primitives";

import type {
    AdminOrdersQuery,
    AdminPaginatedOrdersDTO,
    UpdateAdminOrderStatusPayload,
} from "@/entities/order/types";

const BASE = "/api/admin/orders";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: AdminOrdersQuery): string {
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

    if (params.status !== undefined) {
        searchParams.set("status", String(params.status));
    }

    const query = searchParams.toString();

    return query ? `?${query}` : "";
}

export const adminOrdersApi = {
    async getAll(params?: AdminOrdersQuery): Promise<AdminPaginatedOrdersDTO> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            method: "GET",
            credentials: "include",
        });

        return json<AdminPaginatedOrdersDTO>(res);
    },

    async getById(id: ID): Promise<Order> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "GET",
            credentials: "include",
        });

        return json<Order>(res);
    },

    async updateStatus(payload: UpdateAdminOrderStatusPayload): Promise<Order> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(payload.id))}/status`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: payload.status }),
        });

        return json<Order>(res);
    },
};
