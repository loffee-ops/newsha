import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import { asID } from "@shared/primitives";
import type { ID } from "@shared/primitives";
import { REVIEW_STATUS, type ReviewRating, type ReviewStatus } from "@shared/domain/review";

import { AuthErrors, CommonErrors } from "@/errors";

const REVIEW_STATUS_SET = new Set<ReviewStatus>(Object.values(REVIEW_STATUS));

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNonEmptyString(value: unknown): value is string {
    return isString(value) && value.trim().length > 0;
}

function isRating(value: unknown): value is ReviewRating {
    return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function getSingleParam(param: string | string[], fieldName = "param"): string {
    if (Array.isArray(param)) {
        throw CommonErrors.badRequest(`Invalid ${fieldName}`);
    }

    return param;
}

function requireObjectId(value: unknown, fieldName: string): string {
    if (!isNonEmptyString(value)) {
        throw CommonErrors.badRequest(`${fieldName} is required`);
    }

    const normalized = value.trim();

    if (!isValidObjectId(normalized)) {
        throw CommonErrors.badRequest(`Invalid ${fieldName}`);
    }

    return normalized;
}

function normalizeOptionalString(value: unknown, fieldName: string): string | undefined {
    if (value === undefined || value === null) {
        return undefined;
    }

    if (!isString(value)) {
        throw CommonErrors.badRequest(`${fieldName} must be string`);
    }

    const normalized = value.trim();

    return normalized.length > 0 ? normalized : undefined;
}

function normalizeOptionalStringArray(value: unknown, fieldName: string): string[] | undefined {
    if (value === undefined || value === null) {
        return undefined;
    }

    if (!isStringArray(value)) {
        throw CommonErrors.badRequest(`${fieldName} must be string[]`);
    }

    const normalized = value.map((item) => item.trim()).filter(Boolean);

    return normalized.length > 0 ? normalized : undefined;
}

export function validateReviewId(req: Request): ID {
    return asID(requireObjectId(getSingleParam(req.params.id, "review id"), "review id"));
}

export function validateProductId(req: Request): ID {
    return asID(requireObjectId(getSingleParam(req.params.productId, "product id"), "product id"));
}

export function validateReviewStatus(value: unknown): ReviewStatus {
    if (!isString(value) || !REVIEW_STATUS_SET.has(value as ReviewStatus)) {
        throw CommonErrors.badRequest("Invalid review status");
    }

    return value as ReviewStatus;
}

export type CreateReviewInput = {
    productId: ID;
    userId: ID;
    userName: string;
    rating: ReviewRating;
    text?: string;
    photos?: string[];
};

export function validateCreateReview(req: Request): CreateReviewInput {
    const body = req.body as Record<string, unknown>;

    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    const productId = requireObjectId(body.productId, "productId");

    if (!isNonEmptyString(body.userName)) {
        throw CommonErrors.badRequest("userName is required");
    }

    if (!isRating(body.rating)) {
        throw CommonErrors.badRequest("rating must be between 1 and 5");
    }

    return {
        productId: asID(productId),
        userId: asID(req.userId),
        userName: body.userName.trim(),
        rating: body.rating,
        text: normalizeOptionalString(body.text, "text"),
        photos: normalizeOptionalStringArray(body.photos, "photos"),
    };
}
