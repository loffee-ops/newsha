import { z } from "@shared/contracts/common/zod-extend";

export const CategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    nameEn: z.string(),
    nameUa: z.string(),
    slug: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean(),
});

export const CreateCategoryRequestSchema = z.object({
    name: z.string(),
    nameEn: z.string(),
    nameUa: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
    order: z.number().optional(),
    showOnHome: z.boolean().optional(),
});

export const UpdateCategoryRequestSchema = z.object({
    name: z.string().optional(),
    nameEn: z.string().optional(),
    nameUa: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
    order: z.number().optional(),
    showOnHome: z.boolean().optional(),
});

export const SetCategoryActiveRequestSchema = z.object({
    isActive: z.boolean(),
});
