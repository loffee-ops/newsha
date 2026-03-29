import type { ProductDTO } from "@shared/contracts/product";
import type { SearchParamsDTO } from "@shared/contracts/search";

export interface SearchRepository {
    searchProducts(params: SearchParamsDTO): Promise<readonly ProductDTO[]>;
}
