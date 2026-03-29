import type { AppErrorDTO, AppErrorKind } from "@shared/contracts/error";

import {
    ForbiddenError,
    HttpError,
    NetworkError,
    TimeoutError,
    UnauthorizedError,
} from "./http-errors";

type BuildAppErrorParams = {
    kind: AppErrorKind;
    message: string;
    status: number | undefined;
    data: unknown | undefined;
    source: string | undefined;
};

function buildAppError({ kind, message, status, data, source }: BuildAppErrorParams): AppErrorDTO {
    const result: AppErrorDTO = {
        kind,
        message,
    };

    if (status !== undefined) {
        result.status = status;
    }

    if (data !== undefined) {
        result.data = data;
    }

    if (source !== undefined) {
        result.source = source;
    }

    return result;
}

export function toAppError(error: unknown, source?: string): AppErrorDTO {
    if (error instanceof UnauthorizedError) {
        return buildAppError({
            kind: "UNAUTHORIZED",
            message: error.message,
            status: error.status,
            data: error.data,
            source,
        });
    }

    if (error instanceof ForbiddenError) {
        return buildAppError({
            kind: "FORBIDDEN",
            message: error.message,
            status: error.status,
            data: error.data,
            source,
        });
    }

    if (error instanceof TimeoutError) {
        return buildAppError({
            kind: "TIMEOUT",
            message: error.message,
            status: error.status,
            data: error.data,
            source,
        });
    }

    if (error instanceof NetworkError) {
        return buildAppError({
            kind: "NETWORK",
            message: error.message,
            status: error.status,
            data: error.data,
            source,
        });
    }

    if (error instanceof HttpError) {
        if (error.status === 404) {
            return buildAppError({
                kind: "NOT_FOUND",
                message: error.message,
                status: error.status,
                data: error.data,
                source,
            });
        }

        return buildAppError({
            kind: "HTTP",
            message: error.message,
            status: error.status,
            data: error.data,
            source,
        });
    }

    if (error instanceof Error) {
        return buildAppError({
            kind: "UNKNOWN",
            message: error.message,
            status: undefined,
            data: undefined,
            source,
        });
    }

    return buildAppError({
        kind: "UNKNOWN",
        message: "Unknown error",
        status: undefined,
        data: undefined,
        source,
    });
}
