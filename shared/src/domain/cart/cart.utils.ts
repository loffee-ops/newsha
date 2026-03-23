import type { CartRow } from "@shared/domain/cart";
import { addQuantity } from "@shared/primitives";

export function mergeCarts(a: readonly CartRow[], b: readonly CartRow[]): CartRow[] {
    const map = new Map<string, CartRow>();

    for (const row of [...a, ...b]) {
        const key = `${row.productId}:${row.volume ?? "no-volume"}`;
        const prev = map.get(key);

        if (!prev) {
            map.set(key, { ...row });
            continue;
        }

        map.set(key, {
            ...prev,
            qty: addQuantity(prev.qty, row.qty),
        });
    }

    return [...map.values()];
}
