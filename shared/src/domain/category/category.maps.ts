import type { Category } from "@shared/domain/category";
import type { ID, Slug } from "@shared/primitives";

export function createCategoryMaps(categories: readonly Category[]): {
    byId: Record<ID, Category>;
    bySlug: Record<Slug, Category>;
} {
    const byId = {} as Record<ID, Category>;
    const bySlug = {} as Record<Slug, Category>;

    for (const category of categories) {
        byId[category.id] = category;
        bySlug[category.slug] = category;
    }

    return { byId, bySlug };
}
