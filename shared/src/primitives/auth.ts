import type { Brand } from "./brand";
import { BRAND_ERRORS } from "./branding.errors";

export type AuthToken = Brand<string, "AuthToken">;

export function asAuthToken(value: string): AuthToken {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(BRAND_ERRORS.AUTH_TOKEN_INVALID);
    }

    return value as AuthToken;
}
