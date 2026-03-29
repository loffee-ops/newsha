import type { Product, ProductPreview } from "@/entities/product/types";

import { asMoney } from "@shared/primitives";

export function toProductPreviewUI(p: Product): ProductPreview {
    const primaryImage =
        p.gallery.find((g) => g.type === "image" && g.isPrimary) ??
        p.gallery.find((g) => g.type === "image");

    const price = p.basePrice ?? p.volumes?.[0]?.price ?? asMoney(0);
    const oldPrice = p.baseOldPrice ?? p.volumes?.[0]?.oldPrice;

    return {
        id: p.id,
        slug: p.slug,
        name: p.nameUa || p.nameEn || p.name,
        nameEn: p.nameEn,
        nameUa: p.nameUa,
        price,
        categoryId: p.categoryId,

        ...(primaryImage ? { image: primaryImage.url } : {}),
        ...(oldPrice !== undefined ? { oldPrice } : {}),
        ...(p.reviewStats?.average !== undefined ? { rating: p.reviewStats.average } : {}),
        ...(p.reviewStats?.count !== undefined ? { reviewCount: p.reviewStats.count } : {}),
        ...(p.isNew !== undefined ? { isNew: p.isNew } : {}),
        ...(p.isBestseller !== undefined ? { isBestseller: p.isBestseller } : {}),
        ...(p.isTop !== undefined ? { isTop: p.isTop } : {}),
        ...(p.volumes ? { volumes: p.volumes } : {}),
        ...(p.tags ? { tags: p.tags } : {}),
        ...(p.needs ? { needs: p.needs } : {}),
        ...(p.condition ? { condition: p.condition } : {}),
    };
}
