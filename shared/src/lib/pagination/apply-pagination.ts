import type { PaginationQueryDTO, PaginatedResponse } from "@shared/contracts/pagination";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export function applyPagination<T>(
    items: readonly T[],
    query?: PaginationQueryDTO,
): PaginatedResponse<T> {
    const page = query?.page && query.page > 0 ? query.page : DEFAULT_PAGE;
    const limit = query?.limit && query.limit > 0 ? query.limit : DEFAULT_LIMIT;

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);

    const start = (safePage - 1) * limit;
    const end = start + limit;

    return {
        data: items.slice(start, end),
        meta: {
            page: safePage,
            limit,
            total,
            totalPages,
            hasNext: safePage < totalPages,
            hasPrev: safePage > 1,
        },
    };
}
