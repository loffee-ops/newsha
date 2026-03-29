import type { CategoryDTO } from "@shared/contracts/category";
import type { Slug } from "@shared/primitives";

export interface CategoriesRepository {
    getCategories(): Promise<readonly CategoryDTO[]>;
    getCategoryBySlug(slug: Slug): Promise<CategoryDTO | null>;
}
