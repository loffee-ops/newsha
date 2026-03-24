import { z } from "@shared/contracts/common/zod-extend";

import { registry } from "../registry";
import {
    RegisterRequestSchema,
    LoginRequestSchema,
    AuthSessionsResponseSchema,
} from "../schemas/auth.schemas";
import {
    UserResponseSchema,
    ErrorResponseSchema,
    OkResponseSchema,
} from "../schemas/responses.schemas";

registry.registerPath({
    method: "post",
    path: "/api/auth/register",
    summary: "Register user",
    description: "Creates a new user session and sets auth_token + refresh_token cookies.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: RegisterRequestSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "Registered successfully",
            content: {
                "application/json": {
                    schema: UserResponseSchema,
                },
            },
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
        409: {
            description: "Email already exists",
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
    path: "/api/auth/login",
    summary: "Login user",
    description: "Creates a new user session and sets auth_token + refresh_token cookies.",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: LoginRequestSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Logged in successfully",
            content: {
                "application/json": {
                    schema: UserResponseSchema,
                },
            },
        },
        400: {
            description: "Validation error",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
        401: {
            description: "Invalid credentials",
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
    path: "/api/auth/refresh",
    summary: "Refresh session",
    description:
        "Refreshes auth_token using refresh_token cookie and rotates refresh token cookie.",
    responses: {
        200: {
            description: "Session refreshed",
            content: {
                "application/json": {
                    schema: UserResponseSchema,
                },
            },
        },
        401: {
            description: "Refresh token missing or invalid",
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
    path: "/api/auth/me",
    summary: "Get current user",
    description: "Returns currently authenticated user by auth_token cookie or bearer token.",
    responses: {
        200: {
            description: "Current user",
            content: {
                "application/json": {
                    schema: UserResponseSchema,
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
    },
});

registry.registerPath({
    method: "post",
    path: "/api/auth/logout",
    summary: "Logout current session",
    description: "Revokes current session and clears auth_token + refresh_token cookies.",
    responses: {
        200: {
            description: "Logged out successfully",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
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
    },
});

registry.registerPath({
    method: "post",
    path: "/api/auth/logout-all",
    summary: "Logout all sessions",
    description:
        "Revokes all active sessions for current user and clears auth_token + refresh_token cookies.",
    responses: {
        200: {
            description: "All sessions revoked",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
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
    },
});

registry.registerPath({
    method: "get",
    path: "/api/auth/sessions",
    summary: "Get active sessions",
    description: "Returns current authenticated user's active sessions.",
    responses: {
        200: {
            description: "Active sessions",
            content: {
                "application/json": {
                    schema: AuthSessionsResponseSchema,
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
    },
});

registry.registerPath({
    method: "post",
    path: "/api/auth/sessions/{sessionId}/revoke",
    summary: "Revoke session by id",
    description: "Revokes one specific active session of current authenticated user.",
    request: {
        params: z.object({
            sessionId: z.string(),
        }),
    },
    responses: {
        200: {
            description: "Session revoked",
            content: {
                "application/json": {
                    schema: OkResponseSchema,
                },
            },
        },
        400: {
            description: "Invalid session id",
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
        404: {
            description: "Session not found",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
