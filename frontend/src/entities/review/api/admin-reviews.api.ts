import type { Review } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

import type {
    AdminPaginatedReviewsDTO,
    AdminReviewsQuery,
    UpdateAdminReviewStatusPayload,
} from "@/entities/review/types";

const BASE = "/api/admin/reviews";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: AdminReviewsQuery): string {
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

export const adminReviewsApi = {
    async getAll(params?: AdminReviewsQuery): Promise<AdminPaginatedReviewsDTO> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            credentials: "include",
        });

        return json<AdminPaginatedReviewsDTO>(res);
    },

    async getById(id: ID): Promise<Review> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            credentials: "include",
        });

        return json<Review>(res);
    },

    async updateStatus(payload: UpdateAdminReviewStatusPayload): Promise<Review> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(payload.id))}/status`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: payload.status }),
        });

        return json<Review>(res);
    },

    async remove(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },
};
