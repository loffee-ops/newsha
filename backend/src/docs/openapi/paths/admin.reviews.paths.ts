import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";

import { ReviewSchema, UpdateReviewStatusRequestSchema } from "../schemas/review.schemas";
import { ErrorResponseSchema, OkResponseSchema } from "../schemas/responses.schemas";
import { AdminReviewsListResponseSchema } from "../schemas/admin.schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/reviews",
    summary: "List reviews (admin)",
    description: "Returns paginated reviews for admin panel. Requires admin access.",
    responses: {
        200: {
            description: "Paginated reviews",
            content: {
                "application/json": {
                    schema: AdminReviewsListResponseSchema,
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
    method: "get",
    path: "/api/admin/reviews/{id}",
    summary: "Get review by id (admin)",
    description: "Returns one review by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Review",
            content: {
                "application/json": {
                    schema: ReviewSchema,
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
        404: {
            description: "Review not found",
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
    path: "/api/admin/reviews/{id}/status",
    summary: "Update review status (admin)",
    description: "Updates review status. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateReviewStatusRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Review updated",
            content: {
                "application/json": {
                    schema: ReviewSchema,
                },
            },
        },
        400: {
            description: "Invalid review id or status payload",
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
        404: {
            description: "Review not found",
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
    path: "/api/admin/reviews/{id}",
    summary: "Delete review (admin)",
    description: "Deletes review by id. Requires admin access.",
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
        404: {
            description: "Review not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
