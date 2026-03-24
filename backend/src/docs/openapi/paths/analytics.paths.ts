import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";

import { AnalyticsEventSchema } from "../schemas/analytics.schemas";
import { OkResponseSchema, ErrorResponseSchema } from "../schemas/responses.schemas";

registry.registerPath({
    method: "post",
    path: "/api/analytics",
    summary: "Track analytics event",
    description:
        "Accepts analytics event payload from client. Optional x-session-id header may be sent.",
    request: {
        headers: z.object({
            "x-session-id": z.string().optional(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: AnalyticsEventSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Event accepted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid analytics event",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
