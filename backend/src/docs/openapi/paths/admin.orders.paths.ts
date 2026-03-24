import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";

import { AdminOrdersListResponseSchema } from "../schemas/admin.schemas";
import { ErrorResponseSchema } from "../schemas/responses.schemas";
import { OrderSchema, UpdateOrderStatusRequestSchema } from "../schemas/order.schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/orders",
    summary: "List orders (admin)",
    description:
        "Returns paginated orders for admin panel. Optional status filter. Requires admin access.",
    request: {
        query: z.object({
            status: z.enum(["pending", "paid", "shipped", "completed", "cancelled"]).optional(),
        }),
    },
    responses: {
        200: {
            description: "Paginated orders",
            content: {
                "application/json": {
                    schema: AdminOrdersListResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid filter",
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
    method: "get",
    path: "/api/admin/orders/{id}",
    summary: "Get order by id (admin)",
    description: "Returns one order by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Order",
            content: {
                "application/json": {
                    schema: OrderSchema,
                },
            },
        },
        400: {
            description: "Invalid order id",
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
            description: "Order not found",
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
    path: "/api/admin/orders/{id}/status",
    summary: "Update order status (admin)",
    description: "Updates order status. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateOrderStatusRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Order updated",
            content: {
                "application/json": {
                    schema: OrderSchema,
                },
            },
        },
        400: {
            description: "Invalid order id or status payload",
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
            description: "Order not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
