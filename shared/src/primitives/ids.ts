import type { Brand } from "./brand";
import { BRAND_ERRORS } from "./branding.errors";

export type ID = Brand<string, "ID">;
export type Slug = Brand<string, "Slug">;

export function asID(value: string): ID {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(BRAND_ERRORS.ID_EMPTY);
    }

    return value as ID;
}

export function asSlug(value: string): Slug {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(BRAND_ERRORS.SLUG_EMPTY);
    }

    return value as Slug;
}
