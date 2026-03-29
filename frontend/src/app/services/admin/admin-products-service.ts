import type { AdminProductsRepository } from "@/entities/product/repository/admin-products.repository";
import { HttpAdminProductsRepository } from "@/entities/product/repository/http-admin-products.repository";

export function createAdminProductsService(): AdminProductsRepository {
    return new HttpAdminProductsRepository();
}
