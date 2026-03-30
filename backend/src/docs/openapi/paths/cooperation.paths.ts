import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    ErrorResponseSchema,
    OkResponseSchema,
    CreateCooperationRequestSchema,
    CooperationSchema,
    UpdateCooperationStatusRequestSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "post",
    path: "/api/cooperation",
    summary: "Create cooperation request",
    description: "Creates cooperation lead request.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: CreateCooperationRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Cooperation created",
            content: {
                "application/json": {
                    schema: CooperationSchema,
                },
            },
        },
        400: {
            description: "Invalid cooperation payload",
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
    path: "/api/cooperation",
    summary: "List cooperation requests (admin)",
    description: "Returns all cooperation requests. Requires admin access.",
    responses: {
        200: {
            description: "Cooperation requests",
            content: {
                "application/json": {
                    schema: z.array(CooperationSchema),
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
    path: "/api/cooperation/{id}/status",
    summary: "Update cooperation status (admin)",
    description: "Updates cooperation request status. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateCooperationStatusRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Cooperation updated",
            content: {
                "application/json": {
                    schema: CooperationSchema,
                },
            },
        },
        400: {
            description: "Invalid cooperation id or status payload",
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
            description: "Cooperation not found",
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
    path: "/api/cooperation/{id}",
    summary: "Delete cooperation request (admin)",
    description: "Deletes cooperation request by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Cooperation deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid cooperation id",
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
            description: "Cooperation not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
