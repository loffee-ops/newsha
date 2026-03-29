import type { PaginatedResponse } from "@shared/contracts/pagination";
import type {
    CreateProductDTO,
    ProductDTO,
    ProductsQuery,
    UpdateProductDTO,
} from "@shared/contracts/product";
import type { ID, Slug } from "@shared/primitives";

const BASE = "/api/products";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
    }

    return res.json() as Promise<T>;
}

function buildQuery(params?: ProductsQuery): string {
    if (!params) {
        return "";
    }

    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === "") {
            continue;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                search.append(key, String(item));
            });
            continue;
        }

        if (typeof value === "object") {
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                if (nestedValue === undefined || nestedValue === null || nestedValue === "") {
                    continue;
                }

                search.set(`${key}.${nestedKey}`, String(nestedValue));
            }
            continue;
        }

        search.set(key, String(value));
    }

    const query = search.toString();
    return query ? `?${query}` : "";
}

export const productsApi = {
    async getProducts(params?: ProductsQuery): Promise<PaginatedResponse<ProductDTO>> {
        const res = await fetch(`${BASE}${buildQuery(params)}`, {
            credentials: "include",
        });

        return json<PaginatedResponse<ProductDTO>>(res);
    },

    async getProductById(id: ID): Promise<ProductDTO | null> {
        const res = await fetch(`${BASE}/id/${id}`, {
            credentials: "include",
        });

        if (res.status === 404) {
            return null;
        }

        return json<ProductDTO>(res);
    },

    async getProductBySlug(slug: Slug): Promise<ProductDTO | null> {
        const res = await fetch(`${BASE}/slug/${slug}`, {
            credentials: "include",
        });

        if (res.status === 404) {
            return null;
        }

        return json<ProductDTO>(res);
    },

    async searchProducts(query: string): Promise<ProductDTO[]> {
        const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}`, {
            credentials: "include",
        });

        return json<ProductDTO[]>(res);
    },

    async createProduct(dto: CreateProductDTO): Promise<ProductDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<ProductDTO>(res);
    },

    async updateProduct(id: ID, dto: UpdateProductDTO): Promise<ProductDTO> {
        const res = await fetch(`${BASE}/id/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<ProductDTO>(res);
    },

    async deleteProduct(id: ID): Promise<void> {
        const res = await fetch(`${BASE}/id/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(text || res.statusText);
        }
    },
};
