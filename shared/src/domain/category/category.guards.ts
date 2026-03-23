import { CATEGORY_ERROR_CODES } from "@shared/errors";
import type { Category } from "@shared/domain/category";
import type { Slug, ID } from "@shared/primitives";

export function ensureUniqueCategorySlug(
    slug: Slug,
    list: readonly Category[],
    excludeId?: ID,
): void {
    const exists = list.some((c) => c.slug === slug && c.id !== excludeId);

    if (exists) {
        throw new Error(CATEGORY_ERROR_CODES.SLUG_ALREADY_EXISTS);
    }
}
