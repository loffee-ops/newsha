import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    AdminProductsListResponseSchema,
    ErrorResponseSchema,
    OkResponseSchema,
    ProductMutationRequestSchema,
    SetProductActiveRequestSchema,
    SetProductFlagsRequestSchema,
    ProductDTOSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/products",
    summary: "List products (admin)",
    description: "Returns paginated products for admin panel. Requires admin access.",
    responses: {
        200: {
            description: "Paginated products",
            content: {
                "application/json": {
                    schema: AdminProductsListResponseSchema,
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
    path: "/api/admin/products/{id}",
    summary: "Get product by id (admin)",
    description: "Returns one product by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Product",
            content: {
                "application/json": {
                    schema: ProductDTOSchema,
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
        404: {
            description: "Product not found",
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
    path: "/api/admin/products",
    summary: "Create product (admin)",
    description: "Creates product. Requires admin access.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: ProductMutationRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Product created",
            content: {
                "application/json": {
                    schema: ProductDTOSchema,
                },
            },
        },
        400: {
            description: "Invalid product payload",
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
    path: "/api/admin/products/{id}",
    summary: "Update product (admin)",
    description: "Updates product. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: ProductMutationRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Product updated",
            content: {
                "application/json": {
                    schema: ProductDTOSchema,
                },
            },
        },
        400: {
            description: "Invalid product id or payload",
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
            description: "Product not found",
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
    path: "/api/admin/products/{id}",
    summary: "Delete product (admin)",
    description: "Deletes product by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Product deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
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
        404: {
            description: "Product not found",
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
    path: "/api/admin/products/{id}/active",
    summary: "Set product active state (admin)",
    description: "Updates product active flag. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: SetProductActiveRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Product active state updated",
            content: {
                "application/json": {
                    schema: ProductDTOSchema,
                },
            },
        },
        400: {
            description: "Invalid product id or isActive payload",
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
            description: "Product not found",
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
    path: "/api/admin/products/{id}/flags",
    summary: "Set product flags (admin)",
    description: "Updates product flags isNew/isBestseller/isTop. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: SetProductFlagsRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Product flags updated",
            content: {
                "application/json": {
                    schema: ProductDTOSchema,
                },
            },
        },
        400: {
            description: "Invalid product id or flags payload",
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
            description: "Product not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
