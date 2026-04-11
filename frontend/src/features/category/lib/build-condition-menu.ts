import type { CategoryDTO } from "@shared/contracts/category";
import { DESIRED_EFFECT_ROOT_SLUG } from "@shared/domain/category";

export function buildConditionMenu(categories: readonly CategoryDTO[]) {
    const root = categories.find((c) => c.slug === DESIRED_EFFECT_ROOT_SLUG);
    if (!root) return [];

    return categories
        .filter((c) => c.parentId === root.id)
        .sort((a, b) => a.order - b.order)
        .map((c) => ({
            slug: c.slug,
            name: c.name,
        }));
}
