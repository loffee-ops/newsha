import { cyrToLat } from "@shared/lib/search";
import type { OneCProductItem } from "@/integrations/onec/types";

function slugify(value: string): string {
    return cyrToLat(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export type UpsertProductFromOneCInput = {
    externalId: string;
    code: string;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: string;
    categoryExternalId?: string;
    image: string;
    gallery: OneCProductItem["gallery"];
    price: number;
    oldPrice?: number;
    basePrice?: number;
    baseOldPrice?: number;
    shortDescription: string;
    description: string;
    howToUse: string;
    effects: string;
    ingredients: string;
    tags: string[];
    needs: string[];
    condition: string[];
    volumes: NonNullable<OneCProductItem["volumes"]>;
    isNewArrival: boolean;
    isBestseller: boolean;
    isTop: boolean;
    isActive: boolean;
};

export function mapOneCProductToUpsertInput(item: OneCProductItem): UpsertProductFromOneCInput {
    return {
        externalId: item.id,
        code: item.code?.trim() || item.id,
        name: item.name,
        nameEn: item.nameEn ?? "",
        nameUa: item.nameUa ?? "",
        slug: item.slug?.trim() ? item.slug.trim().toLowerCase() : slugify(item.name),
        categoryExternalId: item.categoryExternalId ?? item.categoryId ?? undefined,
        image: item.image ?? "",
        gallery: item.gallery ?? [],
        price: item.price,
        oldPrice: item.oldPrice ?? undefined,
        basePrice: item.basePrice ?? undefined,
        baseOldPrice: item.baseOldPrice ?? undefined,
        shortDescription: item.shortDescription ?? "",
        description: item.description ?? "",
        howToUse: item.howToUse ?? "",
        effects: item.effects ?? "",
        ingredients: item.ingredients ?? "",
        tags: item.tags ?? [],
        needs: item.needs ?? [],
        condition: item.condition ?? [],
        volumes: item.volumes ?? [],
        isNewArrival: item.isNew ?? false,
        isBestseller: item.isBestseller ?? false,
        isTop: item.isTop ?? false,
        isActive: item.deleted ? false : (item.isActive ?? true),
    };
}
