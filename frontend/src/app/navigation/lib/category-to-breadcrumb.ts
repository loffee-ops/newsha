import type { BreadcrumbCategory } from "@shared/domain/breadcrumb";
import type { Category } from "@shared/domain/category";

export function categoryToBreadcrumb(category?: Category): BreadcrumbCategory | undefined {
    if (!category) return;

    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
    };
}
