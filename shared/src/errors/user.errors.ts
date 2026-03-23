export const USER_ERROR_CODES = {
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INVALID_USER_ID: "INVALID_USER_ID",
    INVALID_ROLE: "INVALID_ROLE",
} as const;

export type UserErrorCode = (typeof USER_ERROR_CODES)[keyof typeof USER_ERROR_CODES];
