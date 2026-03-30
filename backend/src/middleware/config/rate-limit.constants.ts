export const RATE_LIMIT_ERROR_CODE = "RATE_LIMITED" as const;
export const RATE_LIMIT_ERROR_KIND = "TOO_MANY_REQUESTS" as const;

export const RATE_LIMIT_MESSAGES = {
    global: "Too many requests, please try again later",
    auth: "Too many auth attempts, please try again later",
    refresh: "Too many refresh attempts, please try again later",
    publicForm: "Too many form submissions, please try again later",
    search: "Too many search requests, please try again later",
} as const;
