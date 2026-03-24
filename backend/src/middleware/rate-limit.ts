import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: "RATE_LIMITED",
        kind: "TOO_MANY_REQUESTS",
        message: "Too many requests, please try again later",
    },
});

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: "RATE_LIMITED",
        kind: "TOO_MANY_REQUESTS",
        message: "Too many auth attempts, please try again later",
    },
});

export const refreshRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: "RATE_LIMITED",
        kind: "TOO_MANY_REQUESTS",
        message: "Too many refresh attempts, please try again later",
    },
});

export const publicFormRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: "RATE_LIMITED",
        kind: "TOO_MANY_REQUESTS",
        message: "Too many form submissions, please try again later",
    },
});

export const searchRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        code: "RATE_LIMITED",
        kind: "TOO_MANY_REQUESTS",
        message: "Too many search requests, please try again later",
    },
});
