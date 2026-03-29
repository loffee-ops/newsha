import type { ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

const BASE = "/api/recently-viewed";

type RecentlyViewedResponseDTO = {
    items: readonly ProductDTO[];
};

type OkResponseDTO = {
    ok: true;
};

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

export const recentlyViewedApi = {
    async getRecentlyViewed(): Promise<RecentlyViewedResponseDTO> {
        const res = await fetch(BASE, {
            method: "GET",
            credentials: "include",
        });

        return json<RecentlyViewedResponseDTO>(res);
    },

    async addRecentlyViewed(productId: ID): Promise<OkResponseDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(String(productId))}`, {
            method: "POST",
            credentials: "include",
        });

        return json<OkResponseDTO>(res);
    },
};
