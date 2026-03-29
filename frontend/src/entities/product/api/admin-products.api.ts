import type { CreateProductDTO, ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

import type {
    AdminPaginatedProductsDTO,
    AdminProductsQuery,
    SetAdminProductActivePayload,
    SetAdminProductFlagsPayload,
    UpdateAdminProductPayload,
} from "@/entities/product/types";

const BASE = "/api/admin/products";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: AdminProductsQuery): string {
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

export const adminProductsApi = {
    async getAll(params?: AdminProductsQuery): Promise<AdminPaginatedProductsDTO> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            credentials: "include",
        });

        return json<AdminPaginatedProductsDTO>(res);
    },

    async getById(id: ID): Promise<ProductDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            credentials: "include",
        });

        return json<ProductDTO>(res);
    },

    async create(payload: CreateProductDTO): Promise<ProductDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<ProductDTO>(res);
    },

    async update(payload: UpdateAdminProductPayload): Promise<ProductDTO> {
        const { id, ...body } = payload;

        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return json<ProductDTO>(res);
    },

    async remove(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },

    async setActive(payload: SetAdminProductActivePayload): Promise<ProductDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(payload.id))}/active`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isActive: payload.isActive }),
        });

        return json<ProductDTO>(res);
    },

    async setFlags(payload: SetAdminProductFlagsPayload): Promise<ProductDTO> {
        const { id, ...body } = payload;

        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}/flags`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return json<ProductDTO>(res);
    },
};
