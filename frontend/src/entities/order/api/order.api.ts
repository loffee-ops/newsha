import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { PaginatedResponse, PaginationQueryDTO } from "@shared/contracts/pagination";
import type { Order } from "@shared/domain/order";

export type OrdersQuery = Pick<PaginationQueryDTO, "page" | "limit">;
export type PaginatedOrdersDTO = PaginatedResponse<Order>;

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: OrdersQuery): string {
    if (!params) return "";

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

export async function checkoutApi(payload: CheckoutDTO): Promise<Order> {
    const res = await fetch("/api/orders/checkout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return json<Order>(res);
}

export async function fetchMyOrdersApi(params?: OrdersQuery): Promise<PaginatedOrdersDTO> {
    const res = await fetch(`/api/orders${buildQuery(params)}`, {
        method: "GET",
        credentials: "include",
    });

    return json<PaginatedOrdersDTO>(res);
}
