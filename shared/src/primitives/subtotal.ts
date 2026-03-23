import type { Brand } from "./brand";
import { BRAND_ERRORS } from "./branding.errors";
import type { Money } from "./money";
import type { Quantity } from "./quantity";

export type Subtotal = Brand<number, "Subtotal">;

export function asSubtotal(value: number): Subtotal {
    if (!Number.isInteger(value) || value < 0) {
        throw new Error(BRAND_ERRORS.SUBTOTAL_INVALID);
    }

    return value as Subtotal;
}

export function calcSubtotal(price: Money, qty: Quantity): Subtotal {
    return asSubtotal((price as number) * (qty as number));
}

export function addSubtotal(a: Subtotal, b: Subtotal): Subtotal {
    return asSubtotal((a as number) + (b as number));
}
