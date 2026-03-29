import type { CartItem } from "@/entities/cart/types";
import { asQuantity, calcSubtotal } from "@shared/primitives";

export const getIncreaseItem = (item: CartItem): CartItem => {
    const nextQty = asQuantity(Number(item.qty) + 1);

    return {
        ...item,
        qty: nextQty,
        subtotal: calcSubtotal(item.price, nextQty),
    };
};

export const getDecreaseItem = (item: CartItem): CartItem | null => {
    const nextQtyRaw = Number(item.qty) - 1;

    if (nextQtyRaw < 1) {
        return null;
    }

    const nextQty = asQuantity(nextQtyRaw);

    return {
        ...item,
        qty: nextQty,
        subtotal: calcSubtotal(item.price, nextQty),
    };
};
