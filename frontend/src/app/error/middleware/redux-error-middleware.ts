import type { Middleware } from "@reduxjs/toolkit";

import { normalizeError, isAppError } from "@/app/error/lib";
import { logger } from "@/app/error/model";

type RejectedAction = {
    type: string;
    payload?: unknown;
    error?: unknown;
};

function isRejectedAction(action: unknown): action is RejectedAction {
    return (
        typeof action === "object" &&
        action !== null &&
        "type" in action &&
        typeof (action as { type?: unknown }).type === "string" &&
        (action as { type: string }).type.endsWith("/rejected")
    );
}

export const reduxErrorMiddleware: Middleware = () => (next) => (action) => {
    const result = next(action);

    if (isRejectedAction(action)) {
        try {
            const error = isAppError(action.payload)
                ? action.payload
                : normalizeError(action.payload ?? action.error);

            logger.report(error);
        } catch (error) {
            console.error("reduxErrorMiddleware failed:", error);
        }
    }

    return result;
};
