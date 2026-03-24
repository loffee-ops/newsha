import { z } from "@shared/contracts/common/zod-extend";

export const WishlistResponseSchema = z.object({
    items: z.array(z.string()),
});

export const WishlistMutationRequestSchema = z.object({
    productId: z.string(),
});
