import { z } from "@shared/contracts/common/zod-extend";

import { BANNER_PLACEMENTS, BANNER_VARIANTS } from "@shared/domain/banner";

import { ProductDTOSchema } from "./product.schemas";
import { OrderSchema } from "./order.schemas";
import { ReviewSchema } from "./review.schemas";

export const AdminBannerSchema = z.object({
    id: z.string(),
    placement: z.enum(BANNER_PLACEMENTS),
    variant: z.enum(BANNER_VARIANTS),
    image: z.string(),
    order: z.number(),
    link: z.string().optional(),
    isActive: z.boolean(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    alt: z.string().optional(),
    title: z.string().optional(),
    subTitle: z.string().optional(),
    buttonText: z.string().optional(),
});

export const AdminBannerListResponseSchema = z.object({
    items: z.array(AdminBannerSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});

export const AdminCategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    nameEn: z.string(),
    nameUa: z.string(),
    slug: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean(),
});

export const AdminCategoryListResponseSchema = z.object({
    items: z.array(AdminCategorySchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});

export const AdminOrdersListResponseSchema = z.object({
    items: z.array(OrderSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});

export const AdminProductsListResponseSchema = z.object({
    items: z.array(ProductDTOSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});

export const AdminReviewsListResponseSchema = z.object({
    items: z.array(ReviewSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});

export const AdminUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().optional(),
    avatar: z.string().optional(),
    role: z.enum(["user", "admin"]),
});

export const AdminUsersListResponseSchema = z.object({
    items: z.array(AdminUserSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
});

export const UploadAdminBannerRequestSchema = z.object({
    file: z.any().optional(),
    placement: z.string(),
    variant: z.string(),
    order: z.union([z.string(), z.number()]).optional(),
    link: z.string().optional(),
    isActive: z.union([z.string(), z.boolean()]).optional(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    alt: z.string().optional(),
    title: z.string().optional(),
    subTitle: z.string().optional(),
    buttonText: z.string().optional(),
});

export const UpdateAdminBannerRequestSchema = z.object({
    placement: z.string().optional(),
    variant: z.string().optional(),
    order: z.number().optional(),
    link: z.string().optional(),
    isActive: z.boolean().optional(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    alt: z.string().optional(),
    title: z.string().optional(),
    subTitle: z.string().optional(),
    buttonText: z.string().optional(),
});
