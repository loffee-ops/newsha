import type { Money } from "@shared/primitives";

export enum ProductVolume {
    ML_1 = 1,
    ML_2 = 2,
    ML_10 = 10,
    ML_15 = 15,
    ML_20 = 20,
    ML_30 = 30,
    ML_50 = 50,
    ML_75 = 75,
    ML_80 = 80,
    ML_100 = 100,
    ML_125 = 125,
    ML_150 = 150,
    ML_200 = 200,
    ML_250 = 250,
    ML_300 = 300,
    ML_500 = 500,
    ML_1000 = 1000,
}

export type ProductUnit = "ml" | "g" | "pcs";

export type ProductVolumeVariant = {
    value: ProductVolume;
    label: string;
    unit: ProductUnit;
    price: Money;
    oldPrice?: Money;
    inStock: boolean;
};

export type GalleryImage = {
    type: "image";
    url: string;
    alt?: string;
    isPrimary: boolean;
};

export type GalleryVideo = {
    type: "video";
    url: string;
    urlPreview?: string;
};

export type ProductGallery = readonly (GalleryImage | GalleryVideo)[];
