import type { CategoryDTO } from "@shared/contracts/category";
import { CATALOG_ROOT_SLUG, CATALOG_SLUGS } from "@shared/domain/category";

export function buildCatalogMenu(categories: readonly CategoryDTO[]) {
    const root = categories.find((c) => c.slug === CATALOG_ROOT_SLUG);
    if (!root) return [];

    return categories
        .filter((c) => c.parentId === root.id && CATALOG_SLUGS.has(c.slug))
        .sort((a, b) => a.order - b.order)
        .map((c) => ({
            slug: c.slug,
            name: c.name,
        }));
}
