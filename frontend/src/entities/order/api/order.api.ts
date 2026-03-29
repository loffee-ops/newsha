import type { Order } from "@shared/domain/order";

import type { CheckoutPayload, OrdersQuery, PaginatedOrdersDTO } from "@/entities/order/types";

const BASE = "/api/orders";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: OrdersQuery): string {
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

    const query = searchParams.toString();

    return query ? `?${query}` : "";
}

export const ordersApi = {
    async checkout(payload: CheckoutPayload): Promise<Order> {
        const res = await fetch(`${BASE}/checkout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<Order>(res);
    },

    async getMyOrders(params?: OrdersQuery): Promise<PaginatedOrdersDTO> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            method: "GET",
            credentials: "include",
        });

        return json<PaginatedOrdersDTO>(res);
    },
};
