import type { ProductDTO } from "@shared/contracts/product";

import type { Product, ProductPreview } from "@/entities/product/types";

export function dtoToProduct(p: ProductDTO): Product {
    return {
        ...p,
        ...(p.ratingAvg !== undefined || p.ratingCount !== undefined
            ? {
                  reviewStats: {
                      average: p.ratingAvg ?? 0,
                      count: p.ratingCount ?? 0,
                      stars: {
                          1: 0,
                          2: 0,
                          3: 0,
                          4: 0,
                          5: 0,
                      },
                  },
              }
            : {}),
    };
}

export function dtoToProductPreview(p: ProductDTO): ProductPreview {
    let effectivePrice = p.price ?? p.basePrice;
    const effectiveOldPrice = p.oldPrice ?? p.baseOldPrice;

    if (!effectivePrice && p.volumes?.length) {
        effectivePrice = p.volumes.reduce(
            (min, v) => (v.price < min ? v.price : min),
            p.volumes[0].price,
        );
    }

    if (!effectivePrice) {
        throw new Error("Product has no price");
    }

    return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        nameEn: p.nameEn,
        nameUa: p.nameUa,
        price: effectivePrice,
        categoryId: p.categoryId,

        ...(p.image !== undefined ? { image: p.image } : {}),
        ...(effectiveOldPrice !== undefined ? { oldPrice: effectiveOldPrice } : {}),
        ...(p.ratingAvg !== undefined ? { rating: p.ratingAvg } : {}),
        ...(p.ratingCount !== undefined ? { reviewCount: p.ratingCount } : {}),
        ...(p.isNew !== undefined ? { isNew: p.isNew } : {}),
        ...(p.isBestseller !== undefined ? { isBestseller: p.isBestseller } : {}),
        ...(p.isTop !== undefined ? { isTop: p.isTop } : {}),
        ...(p.volumes ? { volumes: p.volumes } : {}),
        ...(p.tags ? { tags: p.tags } : {}),
        ...(p.needs ? { needs: p.needs } : {}),
        ...(p.condition ? { condition: p.condition } : {}),
    };
}
