import type { CategoryDTO } from "@shared/contracts/category";
import type { Slug } from "@shared/primitives";

import { categoriesApi } from "../api/categories.api";
import type { CategoriesRepository } from "./categories.repository";

export class HttpCategoriesRepository implements CategoriesRepository {
    getCategories(): Promise<readonly CategoryDTO[]> {
        return categoriesApi.getCategories();
    }

    getCategoryBySlug(slug: Slug): Promise<CategoryDTO | null> {
        return categoriesApi.getCategoryBySlug(slug);
    }
}
