import type { PaginationQueryDTO } from "@shared/contracts/pagination";
import type { ProductGallery, ProductVolumeVariant } from "@shared/domain/product";
import type { ID, Money, Slug } from "@shared/primitives";

export type ProductDTO = {
    id: ID;
    code: string;
    name: string;
    nameEn: string;
    nameUa: string;
    slug: Slug;
    categoryId: ID;
    image?: string;
    gallery: ProductGallery;
    price: Money;
    oldPrice?: Money;
    shortDescription?: string;
    description: string;
    howToUse?: string;
    effects?: string;
    ingredients?: string;
    basePrice?: Money;
    baseOldPrice?: Money;
    volumes?: readonly ProductVolumeVariant[];
    tags?: readonly string[];
    needs?: readonly string[];
    condition?: readonly string[];
    isNew?: boolean;
    isBestseller?: boolean;
    isTop?: boolean;
    isActive: boolean;
    ratingAvg: number;
    ratingCount: number;
};

export type ProductPreviewDTO = {
    id: ID;
    slug: Slug;
    name: string;
    nameEn: string;
    nameUa: string;
    image?: string;
    price: Money;
    oldPrice?: Money;
    volumes?: readonly ProductVolumeVariant[];
    isNew?: boolean;
    isBestseller?: boolean;
    isTop?: boolean;
    categoryId: ID;
    ratingAvg: number;
    ratingCount: number;
};

export type ProductFiltersDTO = {
    tags: string[];
    needs: string[];
    condition: string[];
    volumes: number[];
    price: {
        min: number;
        max: number;
    };
};

export type CreateProductDTO = {
    code: string;
    name: string;
    nameEn?: string;
    nameUa?: string;
    slug: Slug;
    categoryId: ID;
    image?: string;
    gallery?: ProductGallery;
    price: Money;
    oldPrice?: Money;
    shortDescription?: string;
    description: string;
    howToUse?: string;
    effects?: string;
    ingredients?: string;
    basePrice?: Money;
    baseOldPrice?: Money;
    volumes?: readonly ProductVolumeVariant[];
    tags?: readonly string[];
    needs?: readonly string[];
    condition?: readonly string[];
    isNew?: boolean;
    isBestseller?: boolean;
    isTop?: boolean;
    isActive?: boolean;
};

export type UpdateProductDTO = Partial<CreateProductDTO>;

export type ProductsQuery = PaginationQueryDTO & {
    categoryId?: string;
    tags?: string;
    needs?: string;
    condition?: string;
    volume?: string;
    minPrice?: string;
    maxPrice?: string;
    isBestseller?: string;
    isNew?: string;
    isTop?: string;
};
