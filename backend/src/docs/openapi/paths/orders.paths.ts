import { registry } from "@/docs/openapi";

import {
    CheckoutRequestSchema,
    OrderSchema,
    MyOrdersListResponseSchema,
    ErrorResponseSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "post",
    path: "/api/orders/checkout",
    summary: "Checkout",
    description: "Creates order from current authenticated user's cart.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: CheckoutRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Created order",
            content: {
                "application/json": {
                    schema: OrderSchema,
                },
            },
        },
        400: {
            description: "Invalid checkout payload",
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
    path: "/api/orders",
    summary: "Get my orders",
    description: "Returns paginated list of current authenticated user's orders.",
    responses: {
        200: {
            description: "Paginated orders",
            content: {
                "application/json": {
                    schema: MyOrdersListResponseSchema,
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
