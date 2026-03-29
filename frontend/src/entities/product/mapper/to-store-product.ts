import type { Product, StoreProduct, ProductVolumeOption } from "@/entities/product/types";

const cloneVolume = (v: ProductVolumeOption): ProductVolumeOption => ({ ...v });

export function toStoreProduct(p: Product): StoreProduct {
    return {
        id: p.id,
        code: p.code,
        name: p.name,
        nameEn: p.nameEn,
        nameUa: p.nameUa,
        slug: p.slug,
        categoryId: p.categoryId,
        description: p.description,
        isActive: p.isActive,
        price: p.price,
        ratingAvg: p.ratingAvg,
        ratingCount: p.ratingCount,
        gallery: p.gallery.map((g) => ({ ...g })),

        ...(p.image !== undefined ? { image: p.image } : {}),
        ...(p.oldPrice !== undefined ? { oldPrice: p.oldPrice } : {}),
        ...(p.shortDescription !== undefined ? { shortDescription: p.shortDescription } : {}),
        ...(p.howToUse !== undefined ? { howToUse: p.howToUse } : {}),
        ...(p.effects !== undefined ? { effects: p.effects } : {}),
        ...(p.ingredients !== undefined ? { ingredients: p.ingredients } : {}),
        ...(p.basePrice !== undefined ? { basePrice: p.basePrice } : {}),
        ...(p.baseOldPrice !== undefined ? { baseOldPrice: p.baseOldPrice } : {}),
        ...(p.isNew !== undefined ? { isNew: p.isNew } : {}),
        ...(p.isBestseller !== undefined ? { isBestseller: p.isBestseller } : {}),
        ...(p.isTop !== undefined ? { isTop: p.isTop } : {}),
        ...(p.volumes ? { volumes: p.volumes.map(cloneVolume) } : {}),
        ...(p.tags ? { tags: [...p.tags] } : {}),
        ...(p.needs ? { needs: [...p.needs] } : {}),
        ...(p.condition ? { condition: [...p.condition] } : {}),
        ...(p.reviewStats
            ? {
                  reviewStats: {
                      average: p.reviewStats.average,
                      count: p.reviewStats.count,
                      stars: { ...p.reviewStats.stars },
                  },
              }
            : {}),
        ...(p.seo
            ? {
                  seo: {
                      ...(p.seo.title !== undefined ? { title: p.seo.title } : {}),
                      ...(p.seo.description !== undefined
                          ? { description: p.seo.description }
                          : {}),
                      ...(p.seo.ogImage !== undefined ? { ogImage: p.seo.ogImage } : {}),
                      ...(p.seo.keywords ? { keywords: [...p.seo.keywords] } : {}),
                  },
              }
            : {}),
    };
}
