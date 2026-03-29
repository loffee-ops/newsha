import type { SortOrder } from "mongoose";

type BuildMongoSortParams = {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    allowedSortFields: readonly string[];
    defaultSort?: Record<string, SortOrder>;
};

export function buildMongoSort({
    sortBy,
    sortOrder = "desc",
    allowedSortFields,
    defaultSort = { createdAt: -1 },
}: BuildMongoSortParams): Record<string, SortOrder> {
    if (!sortBy || !allowedSortFields.includes(sortBy)) {
        return defaultSort;
    }

    return {
        [sortBy]: sortOrder === "asc" ? 1 : -1,
    };
}
