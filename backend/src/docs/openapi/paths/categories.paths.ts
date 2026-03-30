import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import { CategorySchema, ErrorResponseSchema } from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/categories",
    summary: "List categories",
    description: "Returns active public categories.",
    responses: {
        200: {
            description: "Category list",
            content: {
                "application/json": {
                    schema: z.array(CategorySchema),
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/categories/slug/{slug}",
    summary: "Get category by slug",
    request: {
        params: z.object({
            slug: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Category",
            content: {
                "application/json": {
                    schema: CategorySchema,
                },
            },
        },
        400: {
            description: "Invalid category slug",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
        404: {
            description: "Category not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
