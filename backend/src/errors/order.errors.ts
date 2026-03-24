import { AppError } from "./app.error";
import { ORDER_ERROR_CODES } from "@shared/errors";

export const OrderErrors = {
    notFound: () =>
        new AppError({
            code: ORDER_ERROR_CODES.ORDER_NOT_FOUND,
            kind: "BUSINESS",
            message: "Order not found",
            status: 404,
        }),

    invalidOrderId: () =>
        new AppError({
            code: ORDER_ERROR_CODES.INVALID_ORDER_ID,
            kind: "VALIDATION",
            message: "Invalid order id",
            status: 400,
        }),

    invalidOrderStatus: () =>
        new AppError({
            code: ORDER_ERROR_CODES.INVALID_ORDER_STATUS,
            kind: "VALIDATION",
            message: "Invalid order status",
            status: 400,
        }),
};
