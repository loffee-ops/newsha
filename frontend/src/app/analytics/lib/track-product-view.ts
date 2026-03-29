import type { Product } from "@/entities/product/types";

import { analytics } from "@/entities/analytics/api";
import { fireOnce } from "./event-guards";

export function trackProductView(product: Product): void {
    const price = product.basePrice ?? product.volumes?.[0]?.price;

    if (typeof price !== "number") {
        return;
    }

    fireOnce(`view_product:${product.id}`, () => {
        analytics.viewProduct({
            productId: product.id,
            name: product.name,
            price,
            value: price,
        });
    });
}
