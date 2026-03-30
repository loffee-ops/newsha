import { BANNER_ERROR_CODES } from "@shared/errors";

import { AppError } from "./app.error";

export const BannerErrors = {
    notFound: () =>
        new AppError({
            code: BANNER_ERROR_CODES.BANNER_NOT_FOUND,
            kind: "BUSINESS",
            message: "Banner not found",
            status: 404,
        }),

    uploadFailed: () =>
        new AppError({
            code: BANNER_ERROR_CODES.BANNER_UPLOAD_FAILED,
            kind: "UNKNOWN",
            message: "Upload failed",
            status: 500,
        }),

    fileRequired: () =>
        new AppError({
            code: BANNER_ERROR_CODES.BANNER_FILE_REQUIRED,
            kind: "VALIDATION",
            message: "File is required",
            status: 400,
        }),

    fileTooLarge: () =>
        new AppError({
            code: BANNER_ERROR_CODES.BANNER_FILE_TOO_LARGE,
            kind: "VALIDATION",
            message: "File too large (max 10MB)",
            status: 400,
        }),
};
