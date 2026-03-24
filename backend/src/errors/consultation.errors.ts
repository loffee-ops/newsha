import { AppError } from "./app.error";
import { CONSULTATION_ERROR_CODES } from "@shared/errors";

export const ConsultationErrors = {
    notFound: () =>
        new AppError({
            code: CONSULTATION_ERROR_CODES.CONSULTATION_NOT_FOUND,
            kind: "BUSINESS",
            message: "Consultation not found",
            status: 404,
        }),

    invalidId: () =>
        new AppError({
            code: CONSULTATION_ERROR_CODES.INVALID_CONSULTATION_ID,
            kind: "VALIDATION",
            message: "Invalid consultation id",
            status: 400,
        }),

    invalidStatus: () =>
        new AppError({
            code: CONSULTATION_ERROR_CODES.INVALID_CONSULTATION_STATUS,
            kind: "VALIDATION",
            message: "Invalid consultation status",
            status: 400,
        }),

    requiredFields: () =>
        new AppError({
            code: CONSULTATION_ERROR_CODES.CONSULTATION_REQUIRED_FIELDS,
            kind: "VALIDATION",
            message: "name and phone required",
            status: 400,
        }),
};
