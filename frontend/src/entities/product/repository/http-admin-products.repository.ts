import type { CreateProductDTO, ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

import type {
    AdminPaginatedProductsDTO,
    AdminProductsQuery,
    SetAdminProductActivePayload,
    SetAdminProductFlagsPayload,
    UpdateAdminProductPayload,
} from "@/entities/product/types";
import { adminProductsApi } from "@/entities/product/api";

import type { AdminProductsRepository } from "./admin-products.repository";

export class HttpAdminProductsRepository implements AdminProductsRepository {
    getAll(params?: AdminProductsQuery): Promise<AdminPaginatedProductsDTO> {
        return adminProductsApi.getAll(params);
    }

    getById(id: ID): Promise<ProductDTO> {
        return adminProductsApi.getById(id);
    }

    create(payload: CreateProductDTO): Promise<ProductDTO> {
        return adminProductsApi.create(payload);
    }

    update(payload: UpdateAdminProductPayload): Promise<ProductDTO> {
        return adminProductsApi.update(payload);
    }

    async remove(id: ID): Promise<void> {
        await adminProductsApi.remove(id);
    }

    setActive(payload: SetAdminProductActivePayload): Promise<ProductDTO> {
        return adminProductsApi.setActive(payload);
    }

    setFlags(payload: SetAdminProductFlagsPayload): Promise<ProductDTO> {
        return adminProductsApi.setFlags(payload);
    }
}
