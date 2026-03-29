import type { SearchParamsDTO } from "@shared/contracts/search";

import type { SearchResponseDTO } from "@/entities/search/types";

const BASE = "/api/search";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function toQueryString(params: SearchParamsDTO): string {
    const searchParams = new URLSearchParams();

    const query = params.query.trim();

    if (query) {
        searchParams.set("q", query);
    }

    if (params.limit !== undefined) {
        searchParams.set("limit", String(params.limit));
    }

    const qs = searchParams.toString();

    return qs ? `?${qs}` : "";
}

export const searchApi = {
    async searchProducts(params: SearchParamsDTO): Promise<SearchResponseDTO> {
        const res = await fetch(`${BASE}${toQueryString(params)}`);
        return json<SearchResponseDTO>(res);
    },
};
