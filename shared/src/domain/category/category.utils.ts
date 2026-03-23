import type { Category, CatalogCategorySlug } from "@shared/domain/category";
import { CATALOG_SLUGS } from "./category.catalog";

import type { Slug } from "@shared/primitives";
import { asSlug } from "@shared/primitives";

export function isLeafCategory(categoryId: string, categories: readonly Category[]): boolean {
    return !categories.some((c) => c.parentId === categoryId);
}

export function isRootCategory(category: Category): boolean {
    return category.parentId === null;
}

export function slugifyCategory(value: string): Slug {
    const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9а-щьюяґєії]+/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return asSlug(slug);
}

export function isCatalogCategorySlug(slug: string): slug is CatalogCategorySlug {
    return CATALOG_SLUGS.has(slug as CatalogCategorySlug);
}

export function getCatalogCategories(categories: readonly Category[]): Category[] {
    return categories
        .filter((category) => isCatalogCategorySlug(category.slug))
        .sort((a, b) => a.order - b.order);
}
