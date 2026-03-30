import { registry } from "@/docs/openapi";

import {
    WishlistMutationRequestSchema,
    WishlistResponseSchema,
    ErrorResponseSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/wishlist",
    summary: "Get wishlist",
    description: "Returns current authenticated user's wishlist product ids.",
    responses: {
        200: {
            description: "Wishlist items",
            content: {
                "application/json": {
                    schema: WishlistResponseSchema,
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
    path: "/api/wishlist",
    summary: "Add to wishlist",
    description: "Adds product to current authenticated user's wishlist.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: WishlistMutationRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated wishlist",
            content: {
                "application/json": {
                    schema: WishlistResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid wishlist payload",
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
    method: "delete",
    path: "/api/wishlist",
    summary: "Remove from wishlist",
    description: "Removes product from current authenticated user's wishlist.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: WishlistMutationRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated wishlist",
            content: {
                "application/json": {
                    schema: WishlistResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid wishlist payload",
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
    method: "post",
    path: "/api/wishlist/toggle",
    summary: "Toggle wishlist item",
    description: "Adds or removes product from current authenticated user's wishlist.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: WishlistMutationRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated wishlist",
            content: {
                "application/json": {
                    schema: WishlistResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid wishlist payload",
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
