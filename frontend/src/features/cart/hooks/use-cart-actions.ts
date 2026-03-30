import { useCallback } from "react";

import type { AddToCartDTO, RemoveFromCartDTO } from "@shared/contracts/cart";
import type { CartRow } from "@shared/domain/cart";

import { useAppDispatch } from "@/app/store";

import { addToCart, removeFromCart, clearCart } from "@/features/cart/model";

export function useCartActions() {
    const dispatch = useAppDispatch();

    const add = useCallback(
        (payload: AddToCartDTO): Promise<readonly CartRow[]> =>
            dispatch(addToCart(payload)).unwrap(),
        [dispatch],
    );

    const removeOne = useCallback(
        (payload: RemoveFromCartDTO): Promise<readonly CartRow[]> =>
            dispatch(removeFromCart(payload)).unwrap(),
        [dispatch],
    );

    const clear = useCallback(
        (): Promise<readonly CartRow[]> => dispatch(clearCart()).unwrap(),
        [dispatch],
    );

    return {
        add,
        removeOne,
        clear,
    };
}
