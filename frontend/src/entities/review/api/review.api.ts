import type { CreateReviewDTO } from "@shared/contracts/review/review.dto";
import type { Review } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

const BASE = "/api/reviews";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

export const reviewApi = {
    async createReview(payload: CreateReviewDTO): Promise<Review> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<Review>(res);
    },

    async getProductReviews(productId: ID): Promise<Review[]> {
        const res = await fetch(`${BASE}/product/${encodeURIComponent(String(productId))}`);

        return json<Review[]>(res);
    },

    async getAllProductReviews(productId: ID): Promise<Review[]> {
        const res = await fetch(`${BASE}/product/${encodeURIComponent(String(productId))}/all`, {
            credentials: "include",
        });

        return json<Review[]>(res);
    },

    async approveReview(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}/approve`, {
            method: "PATCH",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },

    async rejectReview(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}/reject`, {
            method: "PATCH",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },

    async deleteReview(id: ID): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(id))}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },
};
