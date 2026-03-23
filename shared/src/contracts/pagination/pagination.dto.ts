export type PaginationQueryDTO = {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type PaginationMetaDTO = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type PaginatedResponse<T> = {
    data: readonly T[];
    meta: PaginationMetaDTO;
};
