import { AppError } from "./app.error";
import { PRODUCT_ERROR_CODES, ORDER_ERROR_CODES } from "@shared/errors";

export const ProductErrors = {
    notFound: () =>
        new AppError({
            code: PRODUCT_ERROR_CODES.PRODUCT_NOT_FOUND,
            kind: "BUSINESS",
            message: "Product not found",
            status: 404,
        }),

    categoryNotFound: () =>
        new AppError({
            code: PRODUCT_ERROR_CODES.CATEGORY_NOT_FOUND,
            kind: "BUSINESS",
            message: "Category not found",
            status: 404,
        }),

    invalidProductId: () =>
        new AppError({
            code: PRODUCT_ERROR_CODES.INVALID_PRODUCT_ID,
            kind: "VALIDATION",
            message: "Invalid product id",
            status: 400,
        }),

    invalidQuantity: () =>
        new AppError({
            code: PRODUCT_ERROR_CODES.INVALID_QUANTITY,
            kind: "VALIDATION",
            message: "Quantity must be > 0",
            status: 400,
        }),

    invalidProductVolume: () =>
        new AppError({
            code: PRODUCT_ERROR_CODES.INVALID_PRODUCT_VOLUME,
            kind: "VALIDATION",
            message: "Selected volume is not available",
            status: 400,
        }),

    cartEmpty: () =>
        new AppError({
            code: ORDER_ERROR_CODES.CART_EMPTY,
            kind: "BUSINESS",
            message: "Cart is empty",
            status: 400,
        }),
};
