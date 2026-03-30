import { useEffect, useRef, useState, useCallback } from "react";

import type { ProductVolume } from "@shared/domain/product";
import type { ID } from "@shared/primitives";
import { asQuantity } from "@shared/primitives";

import { useAppDispatch } from "@/app/store";

import { addToCart } from "@/features/cart/model";

type Options = {
    timeoutMs?: number;
};

type Params = {
    productId: ID;
    categoryId: ID;
    volume: ProductVolume | null;
};

export function useAddToCartUndo({ productId, categoryId, volume }: Params, options?: Options) {
    const dispatch = useAppDispatch();
    const timeout = options?.timeoutMs ?? 3000;

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [state, setState] = useState<"idle" | "pending">("idle");

    const cancel = useCallback(() => {
        if (!timerRef.current) return;

        clearTimeout(timerRef.current);
        timerRef.current = null;
        setState("idle");
    }, []);

    const start = useCallback(() => {
        if (state === "pending") return;
        if (!volume) return;

        setState("pending");

        timerRef.current = setTimeout(() => {
            void dispatch(
                addToCart({
                    productId,
                    categoryId,
                    volume,
                    qty: asQuantity(1),
                }),
            );

            timerRef.current = null;
            setState("idle");
        }, timeout);
    }, [state, volume, timeout, dispatch, productId, categoryId]);

    useEffect(() => {
        return () => {
            cancel();
        };
    }, [cancel]);

    return {
        state,
        start,
        cancel,
        progressMs: timeout,
    };
}
