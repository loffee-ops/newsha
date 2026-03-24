import { z } from "@shared/contracts/common/zod-extend";

export const BannerSchema = z.object({
    id: z.string(),
    placement: z.string(),
    variant: z.string(),
    image: z.string(),
    link: z.string().optional(),
    alt: z.string().optional(),
    title: z.string().optional(),
    subTitle: z.string().optional(),
    buttonText: z.string().optional(),
});
