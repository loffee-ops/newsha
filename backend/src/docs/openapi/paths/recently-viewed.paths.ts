import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    ErrorResponseSchema,
    OkResponseSchema,
    RecentlyViewedResponseSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/recently-viewed",
    summary: "Get recently viewed products",
    description: "Returns current authenticated user's recently viewed products.",
    responses: {
        200: {
            description: "Recently viewed products",
            content: {
                "application/json": {
                    schema: RecentlyViewedResponseSchema,
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "post",
    path: "/api/recently-viewed/{productId}",
    summary: "Add recently viewed product",
    description: "Adds product to current authenticated user's recently viewed list.",
    request: {
        params: z.object({
            productId: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Recently viewed updated",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid productId",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
