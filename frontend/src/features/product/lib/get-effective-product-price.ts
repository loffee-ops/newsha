import type { ProductPreview } from "@/entities/product/types";

export function getEffectiveProductPrice(p: ProductPreview): number | undefined {
    if (p.price !== undefined) {
        return p.price;
    }

    if (p.volumes?.length) {
        return Math.min(...p.volumes.map((v) => v.price));
    }

    return undefined;
}
