import type { CartRow } from "@shared/domain/cart";
import { calcSubtotal } from "@shared/primitives";
import type { ID } from "@shared/primitives";

import type { CartItem } from "@/entities/cart/types";

export type CartVariantMeta = {
    value: CartItem["variant"]["value"];
    label: CartItem["variant"]["label"];
    unit: CartItem["variant"]["unit"];
    price: CartItem["variant"]["price"];
    oldPrice?: CartItem["variant"]["oldPrice"];
};

export type CartVariantMetaMap = Record<ID, readonly CartVariantMeta[]>;

export function mapApiCartToStore(rows: readonly CartRow[]): CartRow[] {
    return rows.map((row) => ({ ...row }));
}

export function mapStoreCartToCartItems(
    rows: readonly CartRow[],
    variantsByProductId: CartVariantMetaMap,
): CartItem[] {
    return rows.flatMap((row) => {
        if (row.volume === null) {
            return [];
        }

        const variants = variantsByProductId[row.productId];
        if (!variants) {
            throw new Error(`Variants not found for product: ${String(row.productId)}`);
        }

        const variant = variants.find((item) => item.value === row.volume);
        if (!variant) {
            throw new Error(
                `Variant not found for product: ${String(row.productId)}, volume: ${String(row.volume)}`,
            );
        }

        const price = row.price;
        const oldPrice = row.oldPrice ?? variant.oldPrice;

        return [
            {
                productId: row.productId,
                variant: {
                    value: variant.value,
                    label: variant.label,
                    unit: variant.unit,
                    price,
                    ...(oldPrice !== undefined ? { oldPrice } : {}),
                },
                price,
                ...(oldPrice !== undefined ? { oldPrice } : {}),
                qty: row.qty,
                subtotal: calcSubtotal(price, row.qty),
            },
        ];
    });
}
