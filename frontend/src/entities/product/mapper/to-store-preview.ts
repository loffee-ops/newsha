import type {
    ProductPreview,
    StoreProductPreview,
    ProductVolumeOption,
} from "@/entities/product/types";

const cloneVolume = (v: ProductVolumeOption): ProductVolumeOption => ({ ...v });

export function toStorePreview(p: ProductPreview): StoreProductPreview {
    return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        nameEn: p.nameEn,
        nameUa: p.nameUa,
        price: p.price,
        categoryId: p.categoryId,

        ...(p.image !== undefined ? { image: p.image } : {}),
        ...(p.oldPrice !== undefined ? { oldPrice: p.oldPrice } : {}),
        ...(p.rating !== undefined ? { rating: p.rating } : {}),
        ...(p.reviewCount !== undefined ? { reviewCount: p.reviewCount } : {}),
        ...(p.isNew !== undefined ? { isNew: p.isNew } : {}),
        ...(p.isBestseller !== undefined ? { isBestseller: p.isBestseller } : {}),
        ...(p.isTop !== undefined ? { isTop: p.isTop } : {}),
        ...(p.volumes ? { volumes: p.volumes.map(cloneVolume) } : {}),
        ...(p.tags ? { tags: [...p.tags] } : {}),
        ...(p.needs ? { needs: [...p.needs] } : {}),
        ...(p.condition ? { condition: [...p.condition] } : {}),
    };
}
