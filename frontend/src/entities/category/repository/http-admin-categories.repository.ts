import type { CategoryDTO } from "@shared/contracts/category";
import type { ID } from "@shared/primitives";

import { adminCategoriesApi } from "@/entities/category/api";
import type {
    AdminCategoryListResponse,
    CreateCategoryPayload,
    SetCategoryActivePayload,
    UpdateCategoryPayload,
} from "@/entities/category/types";

import type { AdminCategoriesRepository } from "./admin-categories.repository";

export class HttpAdminCategoriesRepository implements AdminCategoriesRepository {
    getAll(params?: { page?: number; limit?: number }): Promise<AdminCategoryListResponse> {
        return adminCategoriesApi.getAll(params);
    }

    getById(id: ID): Promise<CategoryDTO> {
        return adminCategoriesApi.getById(id);
    }

    create(payload: CreateCategoryPayload): Promise<CategoryDTO> {
        return adminCategoriesApi.create(payload);
    }

    update(payload: UpdateCategoryPayload): Promise<CategoryDTO> {
        return adminCategoriesApi.update(payload);
    }

    async remove(id: ID): Promise<void> {
        await adminCategoriesApi.remove(id);
    }

    setActive(payload: SetCategoryActivePayload): Promise<CategoryDTO> {
        return adminCategoriesApi.setActive(payload);
    }
}
