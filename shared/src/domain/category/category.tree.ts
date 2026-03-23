import type { Category, CategoryNode } from "@shared/domain/category";
import type { ID } from "@shared/primitives";

export function buildCategoryTree(
    categories: readonly Category[],
    parentId: ID | null = null,
): CategoryNode[] {
    return categories
        .filter((c) => (c.parentId ?? null) === parentId)
        .sort((a, b) => a.order - b.order)
        .map((category) => ({
            ...category,
            children: buildCategoryTree(categories, category.id),
        }));
}
