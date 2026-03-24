import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";

import { AnalyticsEventSchema, AnalyticsStatsSchema } from "../schemas/analytics.schemas";
import { ErrorResponseSchema } from "../schemas/responses.schemas";

registry.registerPath({
    method: "get",
    path: "/api/admin/analytics",
    summary: "Get analytics events (admin)",
    description: "Returns latest analytics events. Requires admin access.",
    request: {
        query: z.object({
            limit: z.union([z.string(), z.number()]).optional(),
        }),
    },
    responses: {
        200: {
            description: "Analytics events",
            content: {
                "application/json": {
                    schema: z.array(AnalyticsEventSchema),
                },
            },
        },
        400: {
            description: "Invalid limit",
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
    path: "/api/admin/analytics/stats",
    summary: "Get analytics stats (admin)",
    description: "Returns aggregated analytics counters. Requires admin access.",
    responses: {
        200: {
            description: "Analytics stats",
            content: {
                "application/json": {
                    schema: AnalyticsStatsSchema,
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
