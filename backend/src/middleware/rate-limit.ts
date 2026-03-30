import { createAppRateLimit, RATE_LIMIT_MESSAGES } from "./config";

export const globalRateLimit = createAppRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: RATE_LIMIT_MESSAGES.global,
});

export const authRateLimit = createAppRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: RATE_LIMIT_MESSAGES.auth,
});

export const refreshRateLimit = createAppRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: RATE_LIMIT_MESSAGES.refresh,
});

export const publicFormRateLimit = createAppRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    message: RATE_LIMIT_MESSAGES.publicForm,
});

export const searchRateLimit = createAppRateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: RATE_LIMIT_MESSAGES.search,
});
