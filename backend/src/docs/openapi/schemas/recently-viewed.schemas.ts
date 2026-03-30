import { z } from "@shared/contracts/common/zod-extend";

import { ProductPreviewDTOSchema } from "./product.schemas";

export const RecentlyViewedResponseSchema = z.object({
    items: z.array(ProductPreviewDTOSchema),
});
