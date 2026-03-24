import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import { asID, asQuantity } from "@shared/primitives";
import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";
import { ProductVolume } from "@shared/domain/product";

import { CommonErrors } from "@/errors";

function isString(v: unknown): v is string {
    return typeof v === "string";
}

function isFiniteNumber(v: unknown): v is number {
    return typeof v === "number" && Number.isFinite(v);
}

function isPositiveInteger(v: unknown): v is number {
    return isFiniteNumber(v) && Number.isInteger(v) && v > 0;
}

function requireObjectId(value: unknown, fieldName: string): string {
    if (!isString(value) || value.trim().length === 0) {
        throw CommonErrors.badRequest(`${fieldName} is required`);
    }

    const normalized = value.trim();

    if (!isValidObjectId(normalized)) {
        throw CommonErrors.badRequest(`Invalid ${fieldName}`);
    }

    return normalized;
}

const ALLOWED_VOLUMES = Object.values(ProductVolume).filter(
    (value): value is ProductVolume => typeof value === "number",
);

function isProductVolume(v: unknown): v is ProductVolume {
    return isFiniteNumber(v) && ALLOWED_VOLUMES.includes(v as ProductVolume);
}

function parseVolume(v: unknown): ProductVolume | null {
    if (v == null) {
        return null;
    }

    if (isProductVolume(v)) {
        return v;
    }

    throw CommonErrors.badRequest("Invalid volume");
}

export function validateAddToCart(req: Request): AddToCartDTO {
    const body = req.body as Partial<AddToCartDTO>;

    const productId = requireObjectId(body.productId, "productId");

    if (!isPositiveInteger(body.qty)) {
        throw CommonErrors.badRequest("qty must be a positive integer");
    }

    let categoryId: ReturnType<typeof asID> | undefined;

    if (body.categoryId !== undefined && body.categoryId !== null) {
        categoryId = asID(requireObjectId(body.categoryId, "categoryId"));
    }

    return {
        productId: asID(productId),
        categoryId,
        volume: parseVolume(body.volume),
        qty: asQuantity(body.qty),
    };
}

export function validateRemoveFromCart(req: Request): RemoveFromCartDTO {
    const body = req.body as Partial<RemoveFromCartDTO>;
    const productId = requireObjectId(body.productId, "productId");

    return {
        productId: asID(productId),
        volume: parseVolume(body.volume),
    };
}
