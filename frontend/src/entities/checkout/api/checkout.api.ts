import type { CheckoutDTO } from "@shared/contracts/checkout";
import type { Order } from "@shared/domain/order";

const BASE = "/api/orders";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

export const checkoutApi = {
    async submitCheckout(payload: CheckoutDTO): Promise<Order> {
        const res = await fetch(`${BASE}/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        return json<Order>(res);
    },
};
