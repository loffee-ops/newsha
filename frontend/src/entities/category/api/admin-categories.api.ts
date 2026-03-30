import type { CategoryDTO } from "@shared/contracts/category";
import type { ID } from "@shared/primitives";

import type {
    AdminCategoryListResponse,
    AdminCategoriesListParams,
    CreateCategoryPayload,
    SetCategoryActivePayload,
    UpdateCategoryPayload,
} from "@/entities/category/types";

const BASE = "/api/admin/categories";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: AdminCategoriesListParams): string {
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

export const adminCategoriesApi = {
    async getAll(params?: AdminCategoriesListParams): Promise<AdminCategoryListResponse> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            credentials: "include",
        });

        return json<AdminCategoryListResponse>(res);
    },

    async getById(id: ID): Promise<CategoryDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            credentials: "include",
        });

        return json<CategoryDTO>(res);
    },

    async create(payload: CreateCategoryPayload): Promise<CategoryDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<CategoryDTO>(res);
    },

    async update(payload: UpdateCategoryPayload): Promise<CategoryDTO> {
        const { id, ...body } = payload;

        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return json<CategoryDTO>(res);
    },

    async remove(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },

    async setActive(payload: SetCategoryActivePayload): Promise<CategoryDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(payload.id))}/active`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isActive: payload.isActive }),
        });

        return json<CategoryDTO>(res);
    },
};
