import type { AddToCartDTO, CartResponseDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

const BASE = "/api/cart";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
    }

    return res.json() as Promise<T>;
}

export const cartApi = {
    async getCart(): Promise<CartResponseDTO> {
        const res = await fetch(BASE, {
            credentials: "include",
        });

        return json<CartResponseDTO>(res);
    },

    async addToCart(payload: AddToCartDTO): Promise<CartResponseDTO> {
        const res = await fetch(`${BASE}/items`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<CartResponseDTO>(res);
    },

    async removeFromCart(payload: RemoveFromCartDTO): Promise<CartResponseDTO> {
        const res = await fetch(`${BASE}/items`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<CartResponseDTO>(res);
    },

    async clearCart(): Promise<CartResponseDTO> {
        const res = await fetch(BASE, {
            method: "DELETE",
            credentials: "include",
        });

        return json<CartResponseDTO>(res);
    },
};
