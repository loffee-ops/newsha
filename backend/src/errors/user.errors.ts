import { USER_ERROR_CODES } from "@shared/errors";

import { AppError } from "./app.error";

export const UserErrors = {
    notFound: () =>
        new AppError({
            code: USER_ERROR_CODES.USER_NOT_FOUND,
            kind: "BUSINESS",
            message: "User not found",
            status: 404,
        }),

    invalidUserId: () =>
        new AppError({
            code: USER_ERROR_CODES.INVALID_USER_ID,
            kind: "VALIDATION",
            message: "Invalid user id",
            status: 400,
        }),

    invalidRole: () =>
        new AppError({
            code: USER_ERROR_CODES.INVALID_ROLE,
            kind: "VALIDATION",
            message: "Invalid role",
            status: 400,
        }),
};
