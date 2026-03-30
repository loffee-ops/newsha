import { registry } from "@/docs/openapi";

import { ProductFiltersSchema } from "@/docs/openapi/schemas";

registry.registerPath({
    method: "get",
    path: "/api/product-filters",
    summary: "Get product filters",
    description: "Returns available public product filters with cached price range.",
    responses: {
        200: {
            description: "Product filters",
            content: {
                "application/json": {
                    schema: ProductFiltersSchema,
                },
            },
        },
    },
});
