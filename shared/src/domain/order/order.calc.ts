import type { OrderItem } from "@shared/domain/order";

import type { Subtotal } from "@shared/primitives";
import { asSubtotal, addSubtotal, calcSubtotal } from "@shared/primitives";

export function calcOrderTotal(items: readonly OrderItem[]): Subtotal {
    let total = asSubtotal(0);

    for (const item of items) {
        const itemTotal = calcSubtotal(item.price, item.quantity);
        total = addSubtotal(total, itemTotal);
    }

    return total;
}
