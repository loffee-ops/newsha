import type { Brand } from "./brand";
import { BRAND_ERRORS } from "./branding.errors";

export type ISODate = Brand<string, "ISODate">;

export function asISODate(value: string): ISODate {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(BRAND_ERRORS.ISO_DATE_INVALID);
    }

    if (Number.isNaN(Date.parse(value))) {
        throw new Error(BRAND_ERRORS.ISO_DATE_INVALID);
    }

    return value as ISODate;
}
