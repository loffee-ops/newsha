import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import { asID, asSlug } from "@shared/primitives";
import type { ID, Slug } from "@shared/primitives";

import { CommonErrors } from "@/errors";

type CategoryParams = {
    id: string;
};

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

function requireTrimmedString(value: unknown, fieldName: string): string {
    if (!isString(value) || value.trim().length === 0) {
        throw CommonErrors.badRequest(`${fieldName} is required`);
    }

    return value.trim();
}

function optionalTrimmedString(value: unknown, fieldName: string): string | undefined {
    if (value === undefined) {
        return undefined;
    }

    if (!isString(value)) {
        throw CommonErrors.badRequest(`${fieldName} must be string`);
    }

    const normalized = value.trim();

    if (normalized.length === 0) {
        throw CommonErrors.badRequest(`${fieldName} must not be empty`);
    }

    return normalized;
}

function nullableTrimmedString(value: unknown, fieldName: string): string | null | undefined {
    if (value === undefined) {
        return undefined;
    }

    if (value === null) {
        return null;
    }

    if (!isString(value)) {
        throw CommonErrors.badRequest(`${fieldName} must be string`);
    }

    const normalized = value.trim();

    return normalized.length === 0 ? null : normalized;
}

function parseSlug(value: unknown, fieldName: string): Slug {
    return asSlug(requireTrimmedString(value, fieldName));
}

function parseOptionalSlug(value: unknown, fieldName: string): Slug | undefined {
    const normalized = optionalTrimmedString(value, fieldName);

    return normalized === undefined ? undefined : asSlug(normalized);
}

function parseOptionalBoolean(value: unknown, fieldName: string): boolean | undefined {
    if (value === undefined) {
        return undefined;
    }

    if (!isBoolean(value)) {
        throw CommonErrors.badRequest(`${fieldName} must be boolean`);
    }

    return value;
}

export function validateCategoryId(req: Request<CategoryParams>): ID {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw CommonErrors.badRequest("Invalid category id");
    }

    return asID(id);
}

export type CreateCategoryInput = {
    name: string;
    nameEn: string;
    nameUa: string;
    slug: Slug;
    image?: string;
    description?: string;
    isActive?: boolean;
};

export function validateCreateCategory(req: Request): CreateCategoryInput {
    const body = req.body as Record<string, unknown>;

    return {
        name: requireTrimmedString(body.name, "name"),
        nameEn: requireTrimmedString(body.nameEn, "nameEn"),
        nameUa: requireTrimmedString(body.nameUa, "nameUa"),
        slug: parseSlug(body.slug, "slug"),
        image: optionalTrimmedString(body.image, "image"),
        description: optionalTrimmedString(body.description, "description"),
        isActive: parseOptionalBoolean(body.isActive, "isActive"),
    };
}

export type UpdateCategoryInput = {
    id: ID;
    name?: string;
    nameEn?: string;
    nameUa?: string;
    slug?: Slug;
    image?: string | null;
    description?: string | null;
    isActive?: boolean;
};

export function validateUpdateCategory(req: Request<CategoryParams>): UpdateCategoryInput {
    const body = req.body as Record<string, unknown>;

    const result: UpdateCategoryInput = {
        id: validateCategoryId(req),
        name: optionalTrimmedString(body.name, "name"),
        nameEn: optionalTrimmedString(body.nameEn, "nameEn"),
        nameUa: optionalTrimmedString(body.nameUa, "nameUa"),
        slug: parseOptionalSlug(body.slug, "slug"),
        image: nullableTrimmedString(body.image, "image"),
        description: nullableTrimmedString(body.description, "description"),
        isActive: parseOptionalBoolean(body.isActive, "isActive"),
    };

    const hasAnyField =
        result.name !== undefined ||
        result.nameEn !== undefined ||
        result.nameUa !== undefined ||
        result.slug !== undefined ||
        result.image !== undefined ||
        result.description !== undefined ||
        result.isActive !== undefined;

    if (!hasAnyField) {
        throw CommonErrors.badRequest("No fields provided for update");
    }

    return result;
}
