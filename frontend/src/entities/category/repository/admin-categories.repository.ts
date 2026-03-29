import type { CategoryDTO } from "@shared/contracts/category";
import type { ID } from "@shared/primitives";

import type {
    AdminCategoryListResponse,
    CreateCategoryPayload,
    SetCategoryActivePayload,
    UpdateCategoryPayload,
} from "@/entities/category/types";

export interface AdminCategoriesRepository {
    getAll(params?: { page?: number; limit?: number }): Promise<AdminCategoryListResponse>;
    getById(id: ID): Promise<CategoryDTO>;
    create(payload: CreateCategoryPayload): Promise<CategoryDTO>;
    update(payload: UpdateCategoryPayload): Promise<CategoryDTO>;
    remove(id: ID): Promise<void>;
    setActive(payload: SetCategoryActivePayload): Promise<CategoryDTO>;
}
