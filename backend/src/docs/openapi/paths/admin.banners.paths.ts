import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "@/docs/openapi";

import {
    OkResponseSchema,
    ErrorResponseSchema,
    UploadAdminBannerRequestSchema,
    UpdateAdminBannerRequestSchema,
    AdminBannerListResponseSchema,
    AdminBannerSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/banners",
    summary: "List banners (admin)",
    description: "Returns paginated banners for admin panel. Requires admin access.",
    responses: {
        200: {
            description: "Paginated banners",
            content: {
                "application/json": {
                    schema: AdminBannerListResponseSchema,
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
    method: "post",
    path: "/api/admin/banners",
    summary: "Upload banner (admin)",
    description: "Creates banner with uploaded file. Requires admin access.",
    request: {
        body: {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: UploadAdminBannerRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Banner created",
            content: {
                "application/json": {
                    schema: AdminBannerSchema,
                },
            },
        },
        400: {
            description: "Invalid banner payload",
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
    path: "/api/admin/banners/{id}",
    summary: "Update banner (admin)",
    description: "Updates banner fields. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateAdminBannerRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Banner updated",
            content: {
                "application/json": {
                    schema: AdminBannerSchema,
                },
            },
        },
        400: {
            description: "Invalid banner id or payload",
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
            description: "Banner not found",
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
    path: "/api/admin/banners/{id}",
    summary: "Delete banner (admin)",
    description: "Deletes banner by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Banner deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid banner id",
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
            description: "Banner not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
