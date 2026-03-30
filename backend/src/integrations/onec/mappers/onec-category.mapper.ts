import { cyrToLat } from "@shared/lib/search";

import type { OneCCategoryItem } from "@/integrations/onec/types";

function slugify(value: string): string {
    return cyrToLat(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export type UpsertCategoryFromOneCInput = {
    externalId: string;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: string;
    image: string | null;
    description: string | null;
    isActive: boolean;
};

export function mapOneCCategoryToUpsertInput(item: OneCCategoryItem): UpsertCategoryFromOneCInput {
    return {
        externalId: item.id,
        name: item.name,
        nameEn: item.nameEn ?? "",
        nameUa: item.nameUa ?? "",
        slug: item.slug?.trim() ? item.slug.trim().toLowerCase() : slugify(item.name),
        image: item.image ?? null,
        description: item.description ?? null,
        isActive: item.deleted ? false : (item.isActive ?? true),
    };
}
