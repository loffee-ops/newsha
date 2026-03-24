import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";

import { ErrorResponseSchema, OkResponseSchema } from "../schemas/responses.schemas";
import { AdminCategoryListResponseSchema, AdminCategorySchema } from "../schemas/admin.schemas";
import {
    CreateCategoryRequestSchema,
    UpdateCategoryRequestSchema,
    SetCategoryActiveRequestSchema,
} from "../schemas/category.schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/categories",
    summary: "List categories (admin)",
    description: "Returns paginated categories for admin panel. Requires admin access.",
    responses: {
        200: {
            description: "Paginated categories",
            content: {
                "application/json": {
                    schema: AdminCategoryListResponseSchema,
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
    path: "/api/admin/categories/{id}",
    summary: "Get category by id (admin)",
    description: "Returns one category by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Category",
            content: {
                "application/json": {
                    schema: AdminCategorySchema,
                },
            },
        },
        400: {
            description: "Invalid category id",
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
            description: "Category not found",
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
    path: "/api/admin/categories",
    summary: "Create category (admin)",
    description: "Creates category. Requires admin access.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: CreateCategoryRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Category created",
            content: {
                "application/json": {
                    schema: AdminCategorySchema,
                },
            },
        },
        400: {
            description: "Invalid category payload",
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
    path: "/api/admin/categories/{id}",
    summary: "Update category (admin)",
    description: "Updates category. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateCategoryRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Category updated",
            content: {
                "application/json": {
                    schema: AdminCategorySchema,
                },
            },
        },
        400: {
            description: "Invalid category id or payload",
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
            description: "Category not found",
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
    path: "/api/admin/categories/{id}",
    summary: "Delete category (admin)",
    description: "Deletes category by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Category deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid category id",
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
            description: "Category not found",
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
    path: "/api/admin/categories/{id}/active",
    summary: "Set category active state (admin)",
    description: "Updates category active flag. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: SetCategoryActiveRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Category active state updated",
            content: {
                "application/json": {
                    schema: AdminCategorySchema,
                },
            },
        },
        400: {
            description: "Invalid category id or isActive payload",
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
            description: "Category not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
