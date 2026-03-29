import { useCallback } from "react";

import { useAppDispatch } from "@/app/store/hooks";

import { closeCart } from "@/features/cart/model/cart-ui.slice";

import { useEscapeClose } from "./use-escape-close";

type UseCartModalReturn = {
    close: () => void;
};

export function useCartModal(isOpen: boolean): UseCartModalReturn {
    const dispatch = useAppDispatch();

    const close = useCallback(() => {
        dispatch(closeCart());
    }, [dispatch]);

    useEscapeClose(isOpen, close);

    return { close };
}
