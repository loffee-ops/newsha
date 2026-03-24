import { registry } from "../registry";

import { ErrorResponseSchema } from "../schemas/responses.schemas";
import { SearchQuerySchema, SearchResponseSchema } from "../schemas/search.schemas";

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
