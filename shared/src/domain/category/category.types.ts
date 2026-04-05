import type { ID, Slug } from "@shared/primitives";

export type Category = {
    id: ID;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: Slug;
    description?: string;
    image?: string;
    parentId: ID | null;
    isActive: boolean;
    order: number;
    showOnHome?: boolean;
};

export interface CategoryNode extends Category {
    children: readonly CategoryNode[];
}

export type CategoryRootSlug = "catalog" | "desired-effect" | "hair-type-condition" | (string & {});

export type CatalogCategorySlug =
    | "shampoo-cleansing"
    | "conditioners"
    | "masks-treatment"
    | "leave-in-care"
    | "oils"
    | "heat-protection"
    | "scalp-care"
    | "anti-dandruff"
    | "styling"
    | "color-masks"
    | "travel-size"
    | "body-care"
    | "hair-perfumes"
    | "for-men"
    | "brushes-accessories"
    | "packaging"
    | (string & {});

export type DesiredEffectSlug =
    | "hydration"
    | "smoothness"
    | "restoration"
    | "volume"
    | "blonde"
    | (string & {});

export type HairTypeConditionSlug =
    | "dry-hair"
    | "normal-hair"
    | "oily-hair"
    | "porous-hair"
    | "fine-hair"
    | (string & {});
