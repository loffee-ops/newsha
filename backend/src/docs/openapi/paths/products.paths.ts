import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    ErrorResponseSchema,
    ProductsListQuerySchema,
    ProductSearchQuerySchema,
    ProductDTOSchema,
    ProductPreviewDTOSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/products",
    summary: "List products",
    description: "Returns active products with optional filters.",
    request: {
        query: ProductsListQuerySchema,
    },
    responses: {
        200: {
            description: "Product list",
            content: {
                "application/json": {
                    schema: z.array(ProductPreviewDTOSchema),
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/products/all",
    summary: "List all active products",
    responses: {
        200: {
            description: "All products",
            content: {
                "application/json": {
                    schema: z.array(ProductPreviewDTOSchema),
                },
            },
        },
    },
});

registry.registerPath({
    method: "get",
    path: "/api/products/search",
    summary: "Search products",
    request: {
        query: ProductSearchQuerySchema,
    },
    responses: {
        200: {
            description: "Search results",
            content: {
                "application/json": {
                    schema: z.array(ProductPreviewDTOSchema),
                },
            },
        },
        400: {
            description: "Invalid search query",
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
    path: "/api/products/slug/{slug}",
    summary: "Get product by slug",
    request: {
        params: z.object({
            slug: z.string(),
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
    method: "get",
    path: "/api/products/{id}",
    summary: "Get product by ID",
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
