import type { CreateProductDTO, ProductDTO } from "@shared/contracts/product";
import type { PaginatedResponse, PaginationQueryDTO } from "@shared/contracts/pagination";
import type { ID } from "@shared/primitives";

export type AdminProductsQuery = Pick<PaginationQueryDTO, "page" | "limit" | "search">;

export type AdminPaginatedProductsDTO = PaginatedResponse<ProductDTO>;

export type UpdateAdminProductPayload = {
    id: ID;
} & Partial<CreateProductDTO>;

export type SetAdminProductActivePayload = {
    id: ID;
    isActive: boolean;
};

export type SetAdminProductFlagsPayload = {
    id: ID;
    isNew?: boolean;
    isBestseller?: boolean;
    isTop?: boolean;
};
