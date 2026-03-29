import type { PaginationMetaDTO } from "@shared/contracts/pagination";

type BuildPaginationMetaParams = {
    page: number;
    limit: number;
    total: number;
};

export function buildPaginationMeta({
    page,
    limit,
    total,
}: BuildPaginationMetaParams): PaginationMetaDTO {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);

    return {
        page: safePage,
        limit,
        total,
        totalPages,
        hasNext: safePage < totalPages,
        hasPrev: safePage > 1,
    };
}
