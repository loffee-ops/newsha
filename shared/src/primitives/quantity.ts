import type { Brand } from "./brand";
import { BRAND_ERRORS } from "./branding.errors";

export type Quantity = Brand<number, "Quantity">;

export function asQuantity(value: number): Quantity {
    if (!Number.isInteger(value) || value < 0) {
        throw new Error(BRAND_ERRORS.QUANTITY_INVALID);
    }

    return value as Quantity;
}

export function addQuantity(a: Quantity, b: Quantity): Quantity {
    return asQuantity((a as number) + (b as number));
}
