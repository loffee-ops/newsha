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

export type CatalogCategorySlug =
    | "shampoo-cleansing"
    | "conditioners"
    | "masks-treatment"
    | "leave-in-care"
    | "oils"
    | "heat-protection"
    | "medical-line"
    | "styling"
    | "color-masks"
    | "travel-size"
    | "body-care"
    | "for-men"
    | "tools-accessories"
    | "gifts"
    | (string & {});
