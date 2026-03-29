import type {
    CreateProductDTO,
    ProductDTO,
    ProductFiltersDTO,
    ProductsQuery,
} from "@shared/contracts/product";
import type { PaginatedResponse } from "@shared/contracts/pagination";
import type { Slug } from "@shared/primitives";

const BASE = "/api/products";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

function toQueryString(query: ProductsQuery): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
        if (value == null) {
            continue;
        }

        const stringValue = String(value).trim();

        if (!stringValue) {
            continue;
        }

        params.set(key, stringValue);
    }

    const qs = params.toString();

    return qs ? `?${qs}` : "";
}

export const productsApi = {
    async getProducts(query: ProductsQuery = {}): Promise<PaginatedResponse<ProductDTO>> {
        const res = await fetch(`${BASE}${toQueryString(query)}`);
        return json<PaginatedResponse<ProductDTO>>(res);
    },

    async getProductById(id: string): Promise<ProductDTO> {
        const res = await fetch(`${BASE}/id/${encodeURIComponent(id)}`);
        return json<ProductDTO>(res);
    },

    async getProductBySlug(slug: Slug): Promise<ProductDTO | null> {
        const res = await fetch(`${BASE}/slug/${encodeURIComponent(String(slug))}`);

        if (res.status === 404) {
            return null;
        }

        return json<ProductDTO>(res);
    },

    async getProductFilters(): Promise<ProductFiltersDTO> {
        const res = await fetch(`${BASE}/filters`);
        return json<ProductFiltersDTO>(res);
    },

    async createProduct(payload: CreateProductDTO): Promise<ProductDTO> {
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
};
