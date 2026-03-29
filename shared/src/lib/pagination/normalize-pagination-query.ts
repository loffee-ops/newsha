import type { PaginationQueryDTO } from "@shared/contracts/pagination";

import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "./pagination.constants";

export type NormalizedPaginationQuery = {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder: "asc" | "desc";
};

export function normalizePaginationQuery(query?: PaginationQueryDTO): NormalizedPaginationQuery {
    const rawPage = Number(query?.page ?? DEFAULT_PAGE);
    const rawLimit = Number(query?.limit ?? DEFAULT_LIMIT);

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : DEFAULT_PAGE;
    const limit =
        Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;

    const search = query?.search?.trim() || undefined;
    const sortBy = query?.sortBy?.trim() || undefined;
    const sortOrder = query?.sortOrder === "asc" ? "asc" : "desc";

    return {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    };
}
