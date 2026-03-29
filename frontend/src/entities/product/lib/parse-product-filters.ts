import type { ProductFilters } from "@/entities/product/types";

function parseNumber(value: string | null): number | undefined {
    if (value === null || value.trim() === "") return undefined;

    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
}

export function parseProductFilters(params: URLSearchParams): ProductFilters {
    const categoryId = params.get("categoryId");
    const min = parseNumber(params.get("min"));
    const max = parseNumber(params.get("max"));

    const price: ProductFilters["price"] = {};

    if (min !== undefined) {
        price.min = min;
    }

    if (max !== undefined) {
        price.max = max;
    }

    const filters: ProductFilters = {
        tags: params.getAll("tags").filter(Boolean),
        needs: params.getAll("needs").filter(Boolean),
        condition: params.getAll("condition").filter(Boolean),
        volumes: params
            .getAll("volumes")
            .map((value) => Number(value))
            .filter((value) => !Number.isNaN(value)),
        price,
    };

    if (categoryId) {
        filters.categoryId = categoryId;
    }

    return filters;
}
