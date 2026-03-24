import { AppError } from "./app.error";
import { COMMON_ERROR_CODES } from "@shared/errors";

export const CommonErrors = {
    badRequest: (message = "Bad request", data?: unknown) =>
        new AppError({
            code: COMMON_ERROR_CODES.BAD_REQUEST,
            kind: "VALIDATION",
            message,
            status: 400,
            data,
        }),

    notFound: (message = "Not found", data?: unknown) =>
        new AppError({
            code: COMMON_ERROR_CODES.NOT_FOUND,
            kind: "NOT_FOUND",
            message,
            status: 404,
            data,
        }),

    internal: () =>
        new AppError({
            code: COMMON_ERROR_CODES.INTERNAL_ERROR,
            kind: "UNKNOWN",
            message: "Internal server error",
            status: 500,
        }),

    forbidden: (message = "Forbidden") =>
        new AppError({
            code: COMMON_ERROR_CODES.FORBIDDEN,
            kind: "FORBIDDEN",
            message,
            status: 403,
        }),
};
