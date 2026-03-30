import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import { BannerSchema, ErrorResponseSchema } from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/banners",
    summary: "Get banners by placement",
    description: "Returns active banners for a specific placement.",
    request: {
        query: z.object({
            placement: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Banner list",
            content: {
                "application/json": {
                    schema: z.array(BannerSchema),
                },
            },
        },
        400: {
            description: "Invalid placement",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
