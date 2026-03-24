import { AppError } from "./app.error";
import { AUTH_ERROR_CODES } from "@shared/errors";

export const AuthErrors = {
    unauthorized: (message = "Unauthorized") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_UNAUTHORIZED,
            kind: "UNAUTHORIZED",
            message,
            status: 401,
        }),

    emailRequired: (message = "Email is required") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_EMAIL_REQUIRED,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    phoneRequired: (message = "Phone is required") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_PHONE_REQUIRED,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    nameRequired: (message = "Name is required") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_NAME_REQUIRED,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    passwordRequired: (message = "Password is required") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_PASSWORD_REQUIRED,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    invalidEmail: (message = "Email format is invalid") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_EMAIL_INVALID,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    invalidPhone: (message = "Phone format is invalid") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_PHONE_INVALID,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    invalidName: (message = "Name format is invalid") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_NAME_INVALID,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    weakPassword: (message = "Password must be at least 8 characters long") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_PASSWORD_WEAK,
            kind: "VALIDATION",
            message,
            status: 400,
        }),

    emailExists: () =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_EMAIL_EXISTS,
            kind: "BUSINESS",
            message: "Email already exists",
            status: 409,
        }),

    invalidCredentials: () =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_INVALID_CREDENTIALS,
            kind: "UNAUTHORIZED",
            message: "Invalid credentials",
            status: 401,
        }),

    googleTokenInvalid: (message = "Invalid Google token") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_GOOGLE_TOKEN_INVALID,
            kind: "UNAUTHORIZED",
            message,
            status: 401,
        }),

    googleTokenPayloadInvalid: (message = "Google token missing required fields") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_GOOGLE_TOKEN_PAYLOAD_INVALID,
            kind: "UNAUTHORIZED",
            message,
            status: 401,
        }),

    googleEmailNotVerified: (message = "Google email is not verified") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_GOOGLE_EMAIL_NOT_VERIFIED,
            kind: "UNAUTHORIZED",
            message,
            status: 401,
        }),

    refreshTokenRequired: (message = "Refresh token is required") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_REFRESH_TOKEN_REQUIRED,
            kind: "UNAUTHORIZED",
            message,
            status: 401,
        }),

    invalidRefreshToken: (message = "Invalid refresh token") =>
        new AppError({
            code: AUTH_ERROR_CODES.AUTH_INVALID_REFRESH_TOKEN,
            kind: "UNAUTHORIZED",
            message,
            status: 401,
        }),
};
