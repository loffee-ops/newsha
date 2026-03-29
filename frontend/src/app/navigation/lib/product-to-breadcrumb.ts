import type { BreadcrumbProduct } from "@shared/domain/breadcrumb";

import type { Product } from "@/entities/product/types";

export function productToBreadcrumb(product?: Product): BreadcrumbProduct | undefined {
    if (!product) return;

    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
    };
}
