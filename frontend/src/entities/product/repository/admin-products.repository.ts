import type { CreateProductDTO, ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

import type {
    AdminPaginatedProductsDTO,
    AdminProductsQuery,
    SetAdminProductActivePayload,
    SetAdminProductFlagsPayload,
    UpdateAdminProductPayload,
} from "@/entities/product/types";

export interface AdminProductsRepository {
    getAll(params?: AdminProductsQuery): Promise<AdminPaginatedProductsDTO>;
    getById(id: ID): Promise<ProductDTO>;
    create(payload: CreateProductDTO): Promise<ProductDTO>;
    update(payload: UpdateAdminProductPayload): Promise<ProductDTO>;
    remove(id: ID): Promise<void>;
    setActive(payload: SetAdminProductActivePayload): Promise<ProductDTO>;
    setFlags(payload: SetAdminProductFlagsPayload): Promise<ProductDTO>;
}
