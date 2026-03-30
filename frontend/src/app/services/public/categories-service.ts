import type { CategoriesRepository } from "@/entities/category/repository/categories.repository";
import { HttpCategoriesRepository } from "@/entities/category/repository/http-categories.repository";

export function createCategoriesService(): CategoriesRepository {
    return new HttpCategoriesRepository();
}
