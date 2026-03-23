export const ANALYTICS_ERROR_CODES = {
    ANALYTICS_INVALID_EVENT: "ANALYTICS_INVALID_EVENT",
} as const;

export type AnalyticsErrorCode = (typeof ANALYTICS_ERROR_CODES)[keyof typeof ANALYTICS_ERROR_CODES];
