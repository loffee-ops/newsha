import type { AdminCategoriesRepository } from "@/entities/category/repository/admin-categories.repository";
import { HttpAdminCategoriesRepository } from "@/entities/category/repository/http-admin-categories.repository";

export function createAdminCategoriesService(): AdminCategoriesRepository {
    return new HttpAdminCategoriesRepository();
}
