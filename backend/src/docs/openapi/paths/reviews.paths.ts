import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    CreateReviewRequestSchema,
    ReviewSchema,
    ErrorResponseSchema,
    OkResponseSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "post",
    path: "/api/reviews",
    summary: "Create review",
    description: "Creates a review for a product. Requires authenticated user.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: CreateReviewRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Review created",
            content: {
                "application/json": {
                    schema: ReviewSchema,
                },
            },
        },
        400: {
            description: "Invalid review payload",
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

registry.registerPath({
    method: "get",
    path: "/api/reviews/product/{productId}",
    summary: "Get approved product reviews",
    request: {
        params: z.object({
            productId: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Approved reviews",
            content: {
                "application/json": {
                    schema: z.array(ReviewSchema),
                },
            },
        },
        400: {
            description: "Invalid product id",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/reviews/product/{productId}/all",
    summary: "Get all product reviews",
    description: "Returns all reviews for a product. Requires admin access.",
    request: {
        params: z.object({
            productId: z.string(),
        }),
    },
    responses: {
        200: {
            description: "All reviews",
            content: {
                "application/json": {
                    schema: z.array(ReviewSchema),
                },
            },
        },
        400: {
            description: "Invalid product id",
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
        403: {
            description: "Forbidden",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "patch",
    path: "/api/reviews/{id}/approve",
    summary: "Approve review",
    description: "Approves a review. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Review approved",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid review id",
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
        403: {
            description: "Forbidden",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "patch",
    path: "/api/reviews/{id}/reject",
    summary: "Reject review",
    description: "Rejects a review. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Review rejected",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid review id",
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
        403: {
            description: "Forbidden",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

registry.registerPath({
    method: "delete",
    path: "/api/reviews/{id}",
    summary: "Delete review",
    description: "Deletes a review. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Review deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid review id",
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
        403: {
            description: "Forbidden",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
