import { HttpCategoriesRepository } from "@/entities/category/repository/http-categories.repository";
import type { CategoriesRepository } from "@/entities/category/repository/categories.repository";

export function createCategoriesService(): CategoriesRepository {
    return new HttpCategoriesRepository();
}
