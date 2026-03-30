import type { SyncSource } from "@shared/domain/sync";

export type OneCListResponse<T> = {
    items: T[];
    nextCursor?: string;
    updatedAt?: string;
};

export type OneCBaseEntity = {
    id: string;
    code?: string;
    updatedAt?: string;
    deleted?: boolean;
    isActive?: boolean;
    source?: SyncSource;
};

export type OneCCategoryItem = OneCBaseEntity & {
    name: string;
    nameEn?: string;
    nameUa?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
    parentId?: string | null;
};

export type OneCProductVolumeItem = {
    value: number;
    label: string;
    unit: "ml" | "g" | "pcs";
    price: number;
    oldPrice?: number | null;
    inStock?: boolean;
};

export type OneCProductGalleryItem = {
    type: "image" | "video";
    url: string;
    alt?: string;
    isPrimary?: boolean;
    urlPreview?: string;
};

export type OneCProductItem = OneCBaseEntity & {
    name: string;
    nameEn?: string;
    nameUa?: string;
    slug?: string;
    categoryId?: string;
    categoryExternalId?: string;
    image?: string | null;
    gallery?: OneCProductGalleryItem[];
    price: number;
    oldPrice?: number | null;
    basePrice?: number | null;
    baseOldPrice?: number | null;
    shortDescription?: string;
    description?: string;
    howToUse?: string;
    effects?: string;
    ingredients?: string;
    tags?: string[];
    needs?: string[];
    condition?: string[];
    volumes?: OneCProductVolumeItem[];
    isNew?: boolean;
    isBestseller?: boolean;
    isTop?: boolean;
};
