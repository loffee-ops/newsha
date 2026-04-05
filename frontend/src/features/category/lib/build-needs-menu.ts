import type { Category } from "@shared/domain/category";
import { HAIR_TYPE_CONDITION_ROOT_SLUG } from "@shared/domain/category";

export function buildNeedsMenu(categories: readonly Category[]) {
    const root = categories.find((c) => c.slug === HAIR_TYPE_CONDITION_ROOT_SLUG);
    if (!root) return [];

    return categories
        .filter((c) => c.parentId === root.id)
        .sort((a, b) => a.order - b.order)
        .map((c) => ({
            slug: c.slug,
            name: c.name,
        }));
}
