import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";

import { ErrorResponseSchema, OkResponseSchema } from "../schemas/responses.schemas";
import {
    CreateConsultationRequestSchema,
    ConsultationSchema,
    UpdateConsultationStatusRequestSchema,
} from "../schemas/consultation.schemas";

registry.registerPath({
    method: "post",
    path: "/api/consultations",
    summary: "Create consultation request",
    description: "Creates consultation request. Auth is optional.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: CreateConsultationRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Consultation created",
            content: {
                "application/json": {
                    schema: ConsultationSchema,
                },
            },
        },
        400: {
            description: "Invalid consultation payload",
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
    path: "/api/consultations",
    summary: "List consultations (admin)",
    description: "Returns all consultations. Requires admin access.",
    responses: {
        200: {
            description: "Consultations",
            content: {
                "application/json": {
                    schema: z.array(ConsultationSchema),
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
    path: "/api/consultations/{id}/status",
    summary: "Update consultation status (admin)",
    description: "Updates consultation status. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: UpdateConsultationStatusRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Consultation updated",
            content: {
                "application/json": {
                    schema: ConsultationSchema,
                },
            },
        },
        400: {
            description: "Invalid consultation id or status payload",
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
            description: "Consultation not found",
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
    path: "/api/consultations/{id}",
    summary: "Delete consultation (admin)",
    description: "Deletes consultation by id. Requires admin access.",
    request: {
        params: z.object({
            id: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Consultation deleted",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid consultation id",
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
            description: "Consultation not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
