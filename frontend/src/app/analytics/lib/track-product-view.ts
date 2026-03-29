import type { Product } from "@/entities/product/types";

import { analyticsApi } from "@/app/analytics/api";
import { fireOnce } from "@/app/analytics/lib";

export function trackProductView(product: Product) {
    const price = product.basePrice ?? product.volumes?.[0]?.price;

    if (!price) return;

    fireOnce(`view_product:${product.id}`, () => {
        analyticsApi.viewProduct({
            productId: product.id,
            name: product.name,
            price,
            value: price,
        });
    });
}
