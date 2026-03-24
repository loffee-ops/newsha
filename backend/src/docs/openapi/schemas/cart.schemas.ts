import { z } from "@shared/contracts/common/zod-extend";

export const CartRowSchema = z.object({
    productId: z.string(),
    volume: z.union([z.string(), z.number()]).nullable(),
    qty: z.number(),
    price: z.number(),
    oldPrice: z.number().optional(),
});

export const CartResponseSchema = z.object({
    items: z.array(CartRowSchema),
});

export const AddToCartRequestSchema = z.object({
    productId: z.string(),
    categoryId: z.string().optional(),
    volume: z.union([z.string(), z.number()]).nullable(),
    qty: z.number(),
});

export const RemoveFromCartRequestSchema = z.object({
    productId: z.string(),
    volume: z.union([z.string(), z.number()]).nullable(),
});
