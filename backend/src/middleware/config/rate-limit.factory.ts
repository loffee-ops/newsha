import rateLimit from "express-rate-limit";

import { RATE_LIMIT_ERROR_CODE, RATE_LIMIT_ERROR_KIND } from "./rate-limit.constants";

type CreateRateLimitOptions = {
    windowMs: number;
    max: number;
    message: string;
};

export function createAppRateLimit(options: CreateRateLimitOptions) {
    return rateLimit({
        windowMs: options.windowMs,
        max: options.max,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            code: RATE_LIMIT_ERROR_CODE,
            kind: RATE_LIMIT_ERROR_KIND,
            message: options.message,
        },
    });
}
