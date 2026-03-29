import type { CategoryDTO } from "@shared/contracts/category";
import type { ID } from "@shared/primitives";

export type AdminCategoryListResponse = {
    items: readonly CategoryDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type CreateCategoryPayload = {
    name: string;
    nameEn: string;
    nameUa: string;
    slug: string;
    image?: string | null;
    description?: string | null;
    isActive?: boolean;
};

export type UpdateCategoryPayload = {
    id: ID;
    name?: string;
    nameEn?: string;
    nameUa?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
    isActive?: boolean;
};

export type SetCategoryActivePayload = {
    id: ID;
    isActive: boolean;
};

export type AdminCategoriesListParams = {
    page?: number;
    limit?: number;
};
