import type { ErrorRequestHandler, Request } from "express";

import { AppError } from "@/errors";
import { logger } from "@/infrastructure/logger/logger";

function shouldSkipAppErrorLog(err: AppError, req: Request): boolean {
    if (err.status !== 401) {
        return false;
    }

    const method = req.method.toUpperCase();
    const url = req.originalUrl;

    return (
        (method === "GET" && url === "/api/auth/me") ||
        (method === "POST" && url === "/api/auth/refresh")
    );
}

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    void next;

    if (err instanceof AppError) {
        const logPayload = {
            code: err.code,
            kind: err.kind,
            status: err.status,
            requestId: req.requestId,
            userId: req.userId,
            method: req.method,
            url: req.originalUrl,
            data: err.data,
        };

        if (!shouldSkipAppErrorLog(err, req)) {
            if (err.status >= 500) {
                logger.error(logPayload, err.message);
            } else if (err.status === 401 || err.status === 403 || err.status === 404) {
                logger.info(logPayload, err.message);
            } else {
                logger.warn(logPayload, err.message);
            }
        }

        res.status(err.status).json({
            code: err.code,
            kind: err.kind,
            message: err.message,
            data: err.data,
        });

        return;
    }

    if (err instanceof Error) {
        logger.error(
            {
                name: err.name,
                message: err.message,
                stack: err.stack,
                requestId: req.requestId,
                userId: req.userId,
                method: req.method,
                url: req.originalUrl,
            },
            "Unhandled error",
        );
    } else {
        logger.error(
            {
                err,
                requestId: req.requestId,
                userId: req.userId,
                method: req.method,
                url: req.originalUrl,
            },
            "Unhandled non-error thrown",
        );
    }

    res.status(500).json({
        code: "INTERNAL_ERROR",
        kind: "UNKNOWN",
        message: "Internal server error",
    });
};
