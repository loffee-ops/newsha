import type { ProductPreview } from "@/entities/product/types";
import type { ProductSort } from "@/entities/product/config";

import { getEffectiveProductPrice } from "./get-effective-product-price";

const getSortablePrice = (product: ProductPreview): number =>
    getEffectiveProductPrice(product) ?? Number.MAX_SAFE_INTEGER;

export function sortProducts(
    products: readonly ProductPreview[],
    sort: ProductSort,
): ProductPreview[] {
    const list = [...products];

    switch (sort) {
        case "price_asc":
            return list.sort((a, b) => getSortablePrice(a) - getSortablePrice(b));

        case "price_desc":
            return list.sort((a, b) => getSortablePrice(b) - getSortablePrice(a));

        case "new":
            return list.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));

        case "popular":
        default:
            return list.sort(
                (a, b) =>
                    (b.rating ?? 0) - (a.rating ?? 0) ||
                    (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
            );
    }
}
