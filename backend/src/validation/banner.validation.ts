import type { Request } from "express";

import { asID } from "@shared/primitives";
import type { ID } from "@shared/primitives";
import type { BannerPlacement, BannerVariant } from "@shared/domain/banner";
import { BANNER_PLACEMENTS, BANNER_VARIANTS } from "@shared/domain/banner";

import { CommonErrors } from "@/errors";

function isString(v: unknown): v is string {
    return typeof v === "string";
}

function isNonEmptyString(v: unknown): v is string {
    return isString(v) && v.trim().length > 0;
}

function isBoolean(v: unknown): v is boolean {
    return typeof v === "boolean";
}

function isInteger(v: unknown): v is number {
    return typeof v === "number" && Number.isInteger(v);
}

function parseDate(v: unknown): Date | undefined {
    if (!isNonEmptyString(v)) return undefined;

    const d = new Date(v);

    if (Number.isNaN(d.getTime())) {
        throw CommonErrors.badRequest("Invalid date");
    }

    return d;
}

function getParam(v: unknown): string {
    if (typeof v === "string") return v;

    throw CommonErrors.badRequest("Invalid param");
}

function optionalString(v: unknown, fieldName: string): string | undefined {
    if (v === undefined || v === null || v === "") return undefined;

    if (!isString(v)) {
        throw CommonErrors.badRequest(`${fieldName} must be string`);
    }

    return v.trim();
}

function nullableString(v: unknown, fieldName: string): string | null | undefined {
    if (v === undefined) return undefined;
    if (v === null || v === "") return null;

    if (!isString(v)) {
        throw CommonErrors.badRequest(`${fieldName} must be string`);
    }

    return v.trim();
}

export function validateBannerId(req: Request): ID {
    return asID(getParam(req.params.id));
}

function isPlacement(v: unknown): v is BannerPlacement {
    return isString(v) && BANNER_PLACEMENTS.includes(v as BannerPlacement);
}

function isVariant(v: unknown): v is BannerVariant {
    return isString(v) && BANNER_VARIANTS.includes(v as BannerVariant);
}

export type UploadBannerInput = {
    placement: BannerPlacement;
    variant?: BannerVariant;
    link?: string;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
    startsAt?: Date;
    endsAt?: Date;
};

export function validateUploadBanner(req: Request): UploadBannerInput {
    if (!req.file) {
        throw CommonErrors.badRequest("File is required");
    }

    const body = req.body as Record<string, unknown>;

    if (!isPlacement(body.placement)) {
        throw CommonErrors.badRequest("Invalid placement");
    }

    if (body.variant !== undefined && !isVariant(body.variant)) {
        throw CommonErrors.badRequest("Invalid variant");
    }

    if (body.link !== undefined && !isString(body.link)) {
        throw CommonErrors.badRequest("Link must be string");
    }

    const startsAt = body.startsAt !== undefined ? parseDate(body.startsAt) : undefined;
    const endsAt = body.endsAt !== undefined ? parseDate(body.endsAt) : undefined;

    if (startsAt && endsAt && startsAt > endsAt) {
        throw CommonErrors.badRequest("startsAt must be before endsAt");
    }

    const alt = optionalString(body.alt, "alt");
    const title = optionalString(body.title, "title");
    const subTitle = optionalString(body.subTitle, "subTitle");
    const buttonText = optionalString(body.buttonText, "buttonText");
    const link = optionalString(body.link, "link");

    return {
        placement: body.placement,
        variant: body.variant as BannerVariant | undefined,
        link,
        alt,
        title,
        subTitle,
        buttonText,
        startsAt,
        endsAt,
    };
}

export type UpdateBannerInput = {
    id: ID;
    placement?: BannerPlacement;
    variant?: BannerVariant;
    link?: string | null;
    alt?: string | null;
    title?: string | null;
    subTitle?: string | null;
    buttonText?: string | null;
    isActive?: boolean;
    order?: number;
    startsAt?: Date | null;
    endsAt?: Date | null;
};

export function validateUpdateBanner(req: Request): UpdateBannerInput {
    const id = validateBannerId(req);
    const body = req.body as Record<string, unknown>;

    if (body.placement !== undefined && !isPlacement(body.placement)) {
        throw CommonErrors.badRequest("Invalid placement");
    }

    if (body.variant !== undefined && !isVariant(body.variant)) {
        throw CommonErrors.badRequest("Invalid variant");
    }

    if (body.link !== undefined && body.link !== null && !isString(body.link)) {
        throw CommonErrors.badRequest("Link must be string");
    }

    if (body.isActive !== undefined && !isBoolean(body.isActive)) {
        throw CommonErrors.badRequest("isActive must be boolean");
    }

    if (body.order !== undefined && !isInteger(body.order)) {
        throw CommonErrors.badRequest("Order must be integer");
    }

    const startsAt =
        body.startsAt === null
            ? null
            : body.startsAt !== undefined
              ? parseDate(body.startsAt)
              : undefined;

    const endsAt =
        body.endsAt === null
            ? null
            : body.endsAt !== undefined
              ? parseDate(body.endsAt)
              : undefined;

    if (startsAt instanceof Date && endsAt instanceof Date && startsAt > endsAt) {
        throw CommonErrors.badRequest("startsAt must be before endsAt");
    }

    const alt = nullableString(body.alt, "alt");
    const title = nullableString(body.title, "title");
    const subTitle = nullableString(body.subTitle, "subTitle");
    const buttonText = nullableString(body.buttonText, "buttonText");
    const link = nullableString(body.link, "link");

    return {
        id,
        placement: body.placement as BannerPlacement | undefined,
        variant: body.variant as BannerVariant | undefined,
        link,
        alt,
        title,
        subTitle,
        buttonText,
        isActive: body.isActive as boolean | undefined,
        order: body.order as number | undefined,
        startsAt,
        endsAt,
    };
}

export function validatePlacementQuery(req: Request): BannerPlacement {
    const placement = getParam(req.query.placement);

    if (!isPlacement(placement)) {
        throw CommonErrors.badRequest("Invalid placement");
    }

    return placement;
}
