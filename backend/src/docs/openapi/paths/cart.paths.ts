import { registry } from "../registry";

import {
    CartResponseSchema,
    AddToCartRequestSchema,
    RemoveFromCartRequestSchema,
} from "../schemas/cart.schemas";
import { ErrorResponseSchema, OkResponseSchema } from "../schemas/responses.schemas";

registry.registerPath({
    method: "get",
    path: "/api/cart",
    summary: "Get cart",
    description: "Returns current authenticated user's cart.",
    responses: {
        200: {
            description: "Cart items",
            content: {
                "application/json": {
                    schema: CartResponseSchema,
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
    path: "/api/cart/items",
    summary: "Add item to cart",
    description: "Adds product item to current authenticated user's cart.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: AddToCartRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated cart",
            content: {
                "application/json": {
                    schema: CartResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid cart payload",
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
    path: "/api/cart/items",
    summary: "Remove item from cart",
    description: "Removes product item from current authenticated user's cart.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: RemoveFromCartRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Updated cart",
            content: {
                "application/json": {
                    schema: CartResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid cart payload",
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
    path: "/api/cart",
    summary: "Clear cart",
    description: "Clears current authenticated user's cart.",
    responses: {
        200: {
            description: "Cart cleared",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
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
