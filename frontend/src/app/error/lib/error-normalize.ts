import type { AppErrorDTO } from "@shared/contracts/error";

import { HttpBaseError } from "@/app/http/errors";

type ErrorWithMessage = {
    message: string;
    name?: string;
    stack?: string;
};

function hasMessage(value: unknown): value is ErrorWithMessage {
    return (
        typeof value === "object" &&
        value !== null &&
        "message" in value &&
        typeof (value as { message?: unknown }).message === "string"
    );
}

function mapHttpErrorToKind(error: HttpBaseError): AppErrorDTO["kind"] {
    if (error.kind === "NETWORK") {
        return "NETWORK";
    }

    if (error.kind === "TIMEOUT") {
        return "TIMEOUT";
    }

    if (error.status === 401) {
        return "UNAUTHORIZED";
    }

    if (error.status === 403) {
        return "FORBIDDEN";
    }

    if (error.status === 404) {
        return "NOT_FOUND";
    }

    return "HTTP";
}

function mapRuntimeNameToKind(raw?: string): AppErrorDTO["kind"] {
    if (!raw) {
        return "UNKNOWN";
    }

    const value = raw.toUpperCase();

    if (value.includes("NETWORK")) {
        return "NETWORK";
    }

    if (value.includes("TIMEOUT")) {
        return "TIMEOUT";
    }

    if (value.includes("UNAUTHORIZED")) {
        return "UNAUTHORIZED";
    }

    if (value.includes("FORBIDDEN")) {
        return "FORBIDDEN";
    }

    if (value.includes("VALIDATION")) {
        return "VALIDATION";
    }

    if (value.includes("NOT_FOUND") || value.includes("NOT FOUND")) {
        return "NOT_FOUND";
    }

    if (value.includes("BUSINESS")) {
        return "BUSINESS";
    }

    if (value.includes("HTTP")) {
        return "HTTP";
    }

    return "UNKNOWN";
}

function safeToString(value: unknown): string {
    if (typeof value === "string") {
        return value;
    }

    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return "Unknown error";
    }
}

export function normalizeError(error: unknown): AppErrorDTO {
    if (error == null) {
        return {
            kind: "UNKNOWN",
            message: "Unknown error",
        };
    }

    if (error instanceof HttpBaseError) {
        return {
            kind: mapHttpErrorToKind(error),
            message: error.message,
            source: "http",
            ...(error.status !== undefined ? { status: error.status } : {}),
            ...(error.data !== undefined ? { data: error.data } : {}),
        };
    }

    if (error instanceof Error) {
        return {
            kind: mapRuntimeNameToKind(error.name),
            message: error.message,
            source: "runtime",
        };
    }

    if (hasMessage(error)) {
        return {
            kind: mapRuntimeNameToKind(error.name),
            message: error.message,
            source: "runtime",
        };
    }

    if (typeof error === "string") {
        return {
            kind: "UNKNOWN",
            message: error,
        };
    }

    return {
        kind: "UNKNOWN",
        message: safeToString(error),
    };
}
