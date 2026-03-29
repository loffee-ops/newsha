import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { CartRow } from "@shared/domain/cart";
import type { CartViewItemDetailed } from "@/entities/cart/types";
import { selectProductPreviews } from "@/features/product/model/product.selectors";
import { asQuantity, asSubtotal, calcSubtotal } from "@shared/primitives";

const selectCartState = (state: RootState): RootState["cart"] => state.cart;

export const selectCartRows = (state: RootState): readonly CartRow[] => selectCartState(state).rows;
export const selectCartStatus = (state: RootState) => selectCartState(state).status;
export const selectCartError = (state: RootState) => selectCartState(state).error;

export const selectIsCartLoading = createSelector(
    [selectCartStatus],
    (status) => status === "loading",
);

export const selectHasCartItems = createSelector([selectCartRows], (rows) => rows.length > 0);

export const selectCartCount = createSelector([selectCartRows], (rows) =>
    asQuantity(rows.reduce((sum: number, row: CartRow) => sum + Number(row.qty), 0)),
);

export const selectCartTotal = createSelector([selectCartRows], (rows) =>
    asSubtotal(
        rows.reduce((sum: number, row: CartRow) => sum + calcSubtotal(row.price, row.qty), 0),
    ),
);

export const selectCartItemsDetailed = createSelector(
    [selectCartRows, selectProductPreviews],
    (rows, products): CartViewItemDetailed[] => {
        const productMap = new Map(products.map((product) => [product.id, product] as const));

        return rows.flatMap((row: CartRow): CartViewItemDetailed[] => {
            if (row.volume === null) {
                return [];
            }

            const product = productMap.get(row.productId);
            if (!product) {
                return [];
            }

            const volume = product.volumes?.find((item) => item.value === row.volume);
            if (!volume) {
                return [];
            }

            return [
                {
                    item: {
                        id: row.productId,
                        slug: product.slug,
                        name: product.name,
                        image: product.image ?? "",
                        volumeValue: volume.value,
                        price: row.price,
                        qty: row.qty,
                        ...(row.oldPrice != null ? { oldPrice: row.oldPrice } : {}),
                    },
                    product,
                    volume,
                    unitPrice: row.price,
                    totalPrice: calcSubtotal(row.price, row.qty),
                },
            ];
        });
    },
);
