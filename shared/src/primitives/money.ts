import type { Brand } from "./brand";
import { BRAND_ERRORS } from "./branding.errors";

export type Money = Brand<number, "Money">;

export function asMoney(value: number): Money {
    if (!Number.isInteger(value) || value < 0) {
        throw new Error(BRAND_ERRORS.MONEY_INVALID);
    }

    return value as Money;
}

export function floorMoney(value: number): Money {
    if (!Number.isFinite(value) || value < 0) {
        throw new Error(BRAND_ERRORS.MONEY_FINITE_NON_NEGATIVE);
    }

    return asMoney(Math.floor(value));
}

export function applyPercentDiscount(price: Money, percent: number): Money {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
        throw new Error(BRAND_ERRORS.PERCENT_INVALID);
    }

    const raw = (price as number) * (1 - percent / 100);
    return floorMoney(raw);
}
