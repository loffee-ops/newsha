import { asID, asMoney, asSlug } from "@shared/primitives";
import type { ProductDTO } from "@shared/contracts/product";
import type { ProductGallery, ProductVolumeVariant } from "@shared/domain/product";

import type { ProductDoc } from "@/models";

function toMoney(value: number | null | undefined) {
    return value != null ? asMoney(value) : undefined;
}

function toGallery(gallery: ProductDoc["gallery"]): ProductGallery {
    return gallery.map((item) => {
        if (item.type === "video") {
            return {
                type: "video" as const,
                url: item.url,
                urlPreview: item.urlPreview || undefined,
            };
        }

        return {
            type: "image" as const,
            url: item.url,
            alt: item.alt || undefined,
            isPrimary: item.isPrimary ?? false,
        };
    });
}

function toVolumes(volumes: ProductDoc["volumes"]): readonly ProductVolumeVariant[] | undefined {
    if (!volumes.length) {
        return undefined;
    }

    return volumes.map((item) => ({
        value: item.value,
        label: item.label,
        unit: item.unit,
        price: asMoney(item.price),
        oldPrice: toMoney(item.oldPrice),
        inStock: item.inStock ?? true,
    }));
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
        image: doc.image || undefined,
        gallery: toGallery(doc.gallery),
        price: asMoney(doc.price),
        oldPrice: toMoney(doc.oldPrice),
        shortDescription: doc.shortDescription || undefined,
        description: doc.description,
        howToUse: doc.howToUse || undefined,
        effects: doc.effects || undefined,
        ingredients: doc.ingredients || undefined,
        basePrice: toMoney(doc.basePrice),
        baseOldPrice: toMoney(doc.baseOldPrice),
        volumes: toVolumes(doc.volumes),
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
