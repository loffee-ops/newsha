import type { SearchRepository } from "@/entities/search/repository";
import { HttpSearchRepository } from "@/entities/search/repository";

export function createSearchService(): SearchRepository {
    return new HttpSearchRepository();
}
