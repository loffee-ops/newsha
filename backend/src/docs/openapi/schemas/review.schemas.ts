import { z } from "@shared/contracts/common/zod-extend";

export const ReviewSchema = z.object({
    id: z.string(),
    productId: z.string(),
    userId: z.string(),
    userName: z.string(),
    rating: z.number(),
    text: z.string().optional(),
    photos: z.array(z.string()).optional(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CreateReviewRequestSchema = z.object({
    productId: z.string(),
    rating: z.number(),
    text: z.string().optional(),
    photos: z.array(z.string()).optional(),
});

export const UpdateReviewStatusRequestSchema = z.object({
    status: z.enum(["pending", "approved", "rejected"]),
});
