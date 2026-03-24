import { z } from "@shared/contracts/common/zod-extend";

const MoneySchema = z.number();
const IDSchema = z.string();
const SlugSchema = z.string();

export const ProductVolumeVariantSchema = z.object({
    value: z.number(),
    label: z.string(),
    unit: z.string(),
    price: z.number(),
    oldPrice: z.number().optional(),
});

export const ProductGalleryItemSchema = z.object({
    type: z.string(),
    url: z.string(),
    alt: z.string().optional(),
    isPrimary: z.boolean().optional(),
});

export const ProductGallerySchema = z.array(ProductGalleryItemSchema);

export const ProductDTOSchema = z.object({
    id: IDSchema,
    code: z.string(),
    name: z.string(),
    nameEn: z.string(),
    nameUa: z.string(),
    slug: SlugSchema,
    categoryId: IDSchema,
    image: z.string().optional(),
    gallery: ProductGallerySchema,
    price: MoneySchema.optional(),
    oldPrice: MoneySchema.optional(),
    shortDescription: z.string().optional(),
    description: z.string(),
    howToUse: z.string().optional(),
    effects: z.string().optional(),
    ingredients: z.string().optional(),
    basePrice: MoneySchema.optional(),
    baseOldPrice: MoneySchema.optional(),
    volumes: z.array(ProductVolumeVariantSchema).optional(),
    tags: z.array(z.string()).optional(),
    needs: z.array(z.string()).optional(),
    condition: z.array(z.string()).optional(),
    isNew: z.boolean().optional(),
    isBestseller: z.boolean().optional(),
    isTop: z.boolean().optional(),
    isActive: z.boolean(),
    ratingAvg: z.number().optional(),
    ratingCount: z.number().optional(),
});

export const ProductPreviewDTOSchema = z.object({
    id: IDSchema,
    slug: SlugSchema,
    name: z.string(),
    nameEn: z.string(),
    nameUa: z.string(),
    image: z.string().optional(),
    price: MoneySchema,
    oldPrice: MoneySchema.optional(),
    volumes: z.array(ProductVolumeVariantSchema).optional(),
    isNew: z.boolean().optional(),
    isBestseller: z.boolean().optional(),
    isTop: z.boolean().optional(),
    categoryId: IDSchema,
    ratingAvg: z.number().optional(),
    ratingCount: z.number().optional(),
});

export const ProductFiltersSchema = z.object({
    tags: z.array(z.string()),
    needs: z.array(z.string()),
    condition: z.array(z.string()),
    volumes: z.array(z.number()),
    price: z.object({
        min: z.number(),
        max: z.number(),
    }),
});

export const SetProductActiveRequestSchema = z.object({
    isActive: z.boolean(),
});

export const SetProductFlagsRequestSchema = z.object({
    isNew: z.boolean().optional(),
    isBestseller: z.boolean().optional(),
    isTop: z.boolean().optional(),
});

export const ProductsListQuerySchema = z.object({
    categoryId: z.string().optional(),
    tags: z.array(z.string()).optional(),
    needs: z.array(z.string()).optional(),
    condition: z.array(z.string()).optional(),
    volume: z.union([z.string(), z.number()]).optional(),
    minPrice: z.union([z.string(), z.number()]).optional(),
    maxPrice: z.union([z.string(), z.number()]).optional(),
    isBestseller: z.string().optional(),
    isNew: z.string().optional(),
    isTop: z.string().optional(),
});

export const ProductSearchQuerySchema = z.object({
    q: z.string(),
});

export const ProductMutationRequestSchema = ProductDTOSchema.omit({ id: true }).partial();
