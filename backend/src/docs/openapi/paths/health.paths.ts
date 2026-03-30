import { registry } from "@/docs/openapi";

import { HealthResponseSchema, ErrorResponseSchema } from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/health",
    summary: "Health check",
    responses: {
        200: {
            description: "Service health",
            content: {
                "application/json": {
                    schema: HealthResponseSchema,
                },
            },
        },
        503: {
            description: "Service unavailable",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
