import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { asQuantity } from "@shared/primitives";

import { useAppSelector } from "@/app/store";

import { analytics } from "@/entities/analytics/api";
import type { CartViewItemDetailed } from "@/entities/cart/types";

import {
    selectIsCartOpen,
    selectCartCount,
    selectCartTotal,
    selectCartItemsDetailed,
} from "@/features/cart/model";

import { useCartActions } from "./use-cart-actions";
import { useCartModal } from "./use-cart-modal";

export function useCartModalController() {
    const open = useAppSelector(selectIsCartOpen);
    const items = useAppSelector(selectCartItemsDetailed);
    const totalQty = useAppSelector(selectCartCount);
    const totalPrice = useAppSelector(selectCartTotal);

    const navigate = useNavigate();
    const { close } = useCartModal(open);

    const { add, removeOne, clear: clearCart } = useCartActions();

    const increase = useCallback(
        (item: CartViewItemDetailed) => {
            void add({
                productId: item.item.id,
                categoryId: item.product.categoryId,
                volume: item.item.volumeValue,
                qty: asQuantity(1),
            });
        },
        [add],
    );

    const decrease = useCallback(
        (item: CartViewItemDetailed) => {
            void removeOne({
                productId: item.item.id,
                volume: item.item.volumeValue,
            });
        },
        [removeOne],
    );

    const remove = useCallback(
        async (item: CartViewItemDetailed) => {
            for (let i = 0; i < Number(item.item.qty); i += 1) {
                await removeOne({
                    productId: item.item.id,
                    volume: item.item.volumeValue,
                });
            }
        },
        [removeOne],
    );

    const clear = useCallback(() => {
        void clearCart();
    }, [clearCart]);

    const checkout = useCallback(() => {
        analytics.beginCheckout({
            items: items.map((item) => ({
                productId: item.product.id,
                qty: item.item.qty,
                price: item.unitPrice,
                value: item.totalPrice,
            })),
            totalQty,
            totalPrice,
            value: totalPrice,
        });

        close();
        navigate("/checkout");
    }, [items, totalQty, totalPrice, close, navigate]);

    return {
        open,
        items,
        totalQty,
        totalPrice,
        increase,
        decrease,
        remove,
        clear,
        checkout,
        close,
    };
}
