import type { ID } from "@shared/primitives";

export type WishlistResponseDTO = {
    items: ID[];
};

const BASE = "/api/wishlist";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Wishlist API error: ${res.status}`);
    }

    return res.json() as Promise<T>;
}

export const wishlistApi = {
    async getWishlist(): Promise<WishlistResponseDTO> {
        const res = await fetch(BASE, {
            credentials: "include",
        });

        return json<WishlistResponseDTO>(res);
    },

    async addToWishlist(productId: ID): Promise<WishlistResponseDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });

        return json<WishlistResponseDTO>(res);
    },

    async removeFromWishlist(productId: ID): Promise<WishlistResponseDTO> {
        const res = await fetch(BASE, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });

        return json<WishlistResponseDTO>(res);
    },

    async toggleWishlist(productId: ID): Promise<WishlistResponseDTO> {
        const res = await fetch(`${BASE}/toggle`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
        });

        return json<WishlistResponseDTO>(res);
    },
};
