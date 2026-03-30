import { z } from "@shared/contracts/common/zod-extend";

import { ProductPreviewDTOSchema } from "./product.schemas";

export const SearchResponseSchema = z.object({
    items: z.array(ProductPreviewDTOSchema),
});

export const SearchQuerySchema = z.object({
    q: z.string(),
    limit: z.union([z.string(), z.number()]).optional(),
});
