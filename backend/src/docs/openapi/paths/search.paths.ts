import { registry } from "@/docs/openapi";

import {
    SearchQuerySchema,
    SearchResponseSchema,
    ErrorResponseSchema,
} from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/search",
    summary: "Search products",
    description: "Searches products by query string with optional result limit.",
    request: {
        query: SearchQuerySchema,
    },
    responses: {
        200: {
            description: "Search results",
            content: {
                "application/json": {
                    schema: SearchResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid search query or limit",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
