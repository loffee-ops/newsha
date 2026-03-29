import type {
    CreateProductDTO,
    ProductDTO,
    ProductFiltersDTO,
    ProductsQuery,
} from "@shared/contracts/product";
import type { PaginatedResponse } from "@shared/contracts/pagination";
import type { Slug } from "@shared/primitives";

import { productsApi } from "../api";
import type { ProductsRepository } from "./products.repository";

export class HttpProductsRepository implements ProductsRepository {
    async getProducts(query: ProductsQuery = {}): Promise<PaginatedResponse<ProductDTO>> {
        return productsApi.getProducts(query);
    }

    async getProductById(id: string): Promise<ProductDTO> {
        return productsApi.getProductById(id);
    }

    async getProductBySlug(slug: Slug): Promise<ProductDTO | null> {
        return productsApi.getProductBySlug(slug);
    }

    async getProductFilters(): Promise<ProductFiltersDTO> {
        return productsApi.getProductFilters();
    }

    async createProduct(payload: CreateProductDTO): Promise<ProductDTO> {
        return productsApi.createProduct(payload);
    }
}
