import type { CategoryDTO } from "@shared/contracts/category";
import type { Slug } from "@shared/primitives";

const BASE = "/api/categories";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
    }

    return res.json() as Promise<T>;
}

export const categoriesApi = {
    async getCategories(): Promise<CategoryDTO[]> {
        const res = await fetch(BASE);
        return json<CategoryDTO[]>(res);
    },

    async getCategoryBySlug(slug: Slug): Promise<CategoryDTO | null> {
        const res = await fetch(`${BASE}/slug/${slug}`);

        if (res.status === 404) {
            return null;
        }

        return json<CategoryDTO>(res);
    },
};
