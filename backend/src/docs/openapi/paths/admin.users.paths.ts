import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    AdminUsersListResponseSchema,
    AdminUserSchema,
    UpdateUserRoleRequestSchema,
    ErrorResponseSchema,
    OkResponseSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/users",
    summary: "List users (admin)",
    description: "Returns paginated users for admin panel. Requires admin access.",
    responses: {
        200: {
            description: "Paginated users",
            content: {
                "application/json": {
                    schema: AdminUsersListResponseSchema,
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
    path: "/api/admin/users/{id}",
    summary: "Get user by id (admin)",
    description: "Returns one user by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "User",
            content: {
                "application/json": {
                    schema: AdminUserSchema,
                },
            },
        },
        400: {
            description: "Invalid user id",
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
            description: "User not found",
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
    path: "/api/admin/users/{id}/role",
    summary: "Update user role (admin)",
    description: "Updates user role. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateUserRoleRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "User updated",
            content: {
                "application/json": {
                    schema: AdminUserSchema,
                },
            },
        },
        400: {
            description: "Invalid user id or role payload",
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
            description: "User not found",
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
    path: "/api/admin/users/{id}",
    summary: "Delete user (admin)",
    description: "Deletes user by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "User deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid user id",
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
            description: "User not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
