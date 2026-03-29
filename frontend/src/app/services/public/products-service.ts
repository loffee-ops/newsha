import type { ProductsRepository } from "@/entities/product/repository/products.repository";
import { HttpProductsRepository } from "@/entities/product/repository/http-products.repository";

export function createProductsService(): ProductsRepository {
    return new HttpProductsRepository();
}
