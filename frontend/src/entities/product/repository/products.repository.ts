import type { PaginatedResponse } from "@shared/contracts/pagination";
import type { Slug } from "@shared/primitives";
import type {
    CreateProductDTO,
    ProductDTO,
    ProductFiltersDTO,
    ProductsQuery,
} from "@shared/contracts/product";

export interface ProductsRepository {
    getProducts(query?: ProductsQuery): Promise<PaginatedResponse<ProductDTO>>;
    getProductById(id: string): Promise<ProductDTO>;
    getProductBySlug(slug: Slug): Promise<ProductDTO | null>;
    getProductFilters(): Promise<ProductFiltersDTO>;
    createProduct(payload: CreateProductDTO): Promise<ProductDTO>;
}
