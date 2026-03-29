import type { AddToCartDTO, CartResponseDTO, RemoveFromCartDTO } from "@shared/contracts/cart";

const BASE = "/api/cart";

export class CartApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "CartApiError";
        this.status = status;
    }
}

async function readErrorMessage(res: Response): Promise<string> {
    try {
        const contentType = res.headers.get("content-type") ?? "";

        if (contentType.includes("application/json")) {
            const data = (await res.json()) as { message?: string; error?: string };

            if (typeof data.message === "string" && data.message.trim()) {
                return data.message;
            }

            if (typeof data.error === "string" && data.error.trim()) {
                return data.error;
            }
        }

        const text = await res.text();

        if (text.trim()) {
            return text;
        }
    } catch {
        // ignore
    }

    return res.statusText || "Request failed";
}

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        throw new CartApiError(await readErrorMessage(res), res.status);
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
