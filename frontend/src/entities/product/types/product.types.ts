import type { ProductDTO, ProductPreviewDTO } from "@shared/contracts/product";
import type { ReviewStats } from "@shared/domain/review";
import type {
    ProductUnit,
    ProductVolumeVariant,
    GalleryImage,
    GalleryVideo,
} from "@shared/domain/product";

import type { SEO } from "@/app/seo/types";

export type ProductGalleryItem = GalleryImage | GalleryVideo;

export type ProductVolumeOption = ProductVolumeVariant & {
    code?: string;
    stock?: number;
    image?: string;
    discountPercent?: number;
};

export type Product = Omit<ProductDTO, "volumes"> & {
    volumes?: readonly ProductVolumeOption[];
    reviewStats?: ReviewStats;
    seo?: SEO;
};

export type ProductPreview = Omit<ProductPreviewDTO, "volumes" | "ratingAvg" | "ratingCount"> & {
    volumes?: readonly ProductVolumeOption[];
    rating?: number;
    reviewCount?: number;
    tags?: readonly string[];
    needs?: readonly string[];
    condition?: readonly string[];
};

export type StoreSEO = Omit<SEO, "keywords"> & {
    keywords?: string[];
};

export type StoreProduct = Omit<
    Product,
    "gallery" | "volumes" | "tags" | "needs" | "condition" | "seo"
> & {
    gallery: ProductGalleryItem[];
    volumes?: ProductVolumeOption[];
    tags?: string[];
    needs?: string[];
    condition?: string[];
    seo?: StoreSEO;
};

export type StoreProductPreview = Omit<
    ProductPreview,
    "volumes" | "tags" | "needs" | "condition"
> & {
    volumes?: ProductVolumeOption[];
    tags?: string[];
    needs?: string[];
    condition?: string[];
};

export type { ProductUnit };
