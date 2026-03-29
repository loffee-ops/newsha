import { ANALYTICS_ERROR_CODES } from "@shared/errors";

import { AppError } from "./app.error";

export const AnalyticsErrors = {
    invalidEvent: () =>
        new AppError({
            code: ANALYTICS_ERROR_CODES.ANALYTICS_INVALID_EVENT,
            kind: "VALIDATION",
            message: "Invalid analytics event",
            status: 400,
        }),
};
