import { asID, asSlug, asMoney } from "@shared/primitives";
import type { ProductDTO } from "@shared/contracts/product";
import type { ProductGallery, ProductVolumeVariant } from "@shared/domain/product";

import type { ProductDoc } from "@/models/product.model";

function toMoney(v: number | null | undefined) {
    return v != null ? asMoney(v) : undefined;
}

export function toProductDTO(doc: ProductDoc): ProductDTO {
    return {
        id: asID(doc._id.toString()),
        code: doc.code,
        name: doc.name,
        nameEn: doc.nameEn,
        nameUa: doc.nameUa,
        slug: asSlug(doc.slug),
        categoryId: asID(doc.categoryId.toString()),
        image: doc.image ?? undefined,
        gallery: doc.gallery as ProductGallery,
        price: toMoney(doc.price),
        oldPrice: toMoney(doc.oldPrice),
        basePrice: toMoney(doc.basePrice),
        baseOldPrice: toMoney(doc.baseOldPrice),
        volumes: doc.volumes.length
            ? (doc.volumes.map((v) => ({
                  value: v.value,
                  label: v.label,
                  unit: v.unit,
                  price: asMoney(v.price),
                  oldPrice: toMoney(v.oldPrice),
                  inStock: true,
              })) as readonly ProductVolumeVariant[])
            : undefined,
        shortDescription: doc.shortDescription ?? undefined,
        description: doc.description,
        howToUse: doc.howToUse ?? undefined,
        effects: doc.effects ?? undefined,
        ingredients: doc.ingredients ?? undefined,
        tags: doc.tags.length ? doc.tags : undefined,
        needs: doc.needs.length ? doc.needs : undefined,
        condition: doc.condition.length ? doc.condition : undefined,
        isNew: doc.isNewArrival || undefined,
        isBestseller: doc.isBestseller || undefined,
        isTop: doc.isTop || undefined,
        isActive: doc.isActive,
        ratingAvg: doc.ratingAvg ?? 0,
        ratingCount: doc.ratingCount ?? 0,
    };
}
