import { COOPERATION_ERROR_CODES } from "@shared/errors";

import { AppError } from "./app.error";

export const CooperationErrors = {
    notFound: () =>
        new AppError({
            code: COOPERATION_ERROR_CODES.COOPERATION_NOT_FOUND,
            kind: "BUSINESS",
            message: "Cooperation not found",
            status: 404,
        }),

    invalidId: () =>
        new AppError({
            code: COOPERATION_ERROR_CODES.INVALID_COOPERATION_ID,
            kind: "VALIDATION",
            message: "Invalid cooperation id",
            status: 400,
        }),

    invalidStatus: () =>
        new AppError({
            code: COOPERATION_ERROR_CODES.INVALID_COOPERATION_STATUS,
            kind: "VALIDATION",
            message: "Invalid cooperation status",
            status: 400,
        }),

    requiredFields: () =>
        new AppError({
            code: COOPERATION_ERROR_CODES.COOPERATION_REQUIRED_FIELDS,
            kind: "VALIDATION",
            message: "name, phone and city required",
            status: 400,
        }),
};
