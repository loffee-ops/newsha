import type { ProductDTO } from "@shared/contracts/product";
import type { SearchParamsDTO } from "@shared/contracts/search";

import { searchApi } from "@/entities/search/api";

import type { SearchRepository } from "./search.repository";

export class HttpSearchRepository implements SearchRepository {
    async searchProducts(params: SearchParamsDTO): Promise<readonly ProductDTO[]> {
        const response = await searchApi.searchProducts(params);
        return response.items;
    }
}
