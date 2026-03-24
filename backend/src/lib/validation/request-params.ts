import { isValidObjectId } from "mongoose";

import { CommonErrors } from "@/errors";

export function getSingleParam(value: string | string[], fieldName = "param"): string {
    if (Array.isArray(value)) {
        throw CommonErrors.badRequest(`Invalid ${fieldName}`);
    }

    return value;
}

export function requireObjectId(
    value: string | string[],
    fieldName = "id",
    message?: string,
): string {
    const id = getSingleParam(value, fieldName);

    if (!isValidObjectId(id)) {
        throw CommonErrors.badRequest(message ?? `Invalid ${fieldName}`);
    }

    return id;
}

export function requireTrimmedString(value: unknown, fieldName: string, message?: string): string {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw CommonErrors.badRequest(message ?? `${fieldName} is required`);
    }

    return value.trim();
}

export function optionalTrimmedString(value: unknown, fieldName: string): string | undefined {
    if (value == null) {
        return undefined;
    }

    if (typeof value !== "string") {
        throw CommonErrors.badRequest(`Invalid ${fieldName}`);
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
}
