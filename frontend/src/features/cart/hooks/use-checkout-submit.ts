import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { analytics } from "@/entities/analytics/api";

import type { CheckoutFormValues } from "@/entities/checkout/types";
import { PAYMENT_METHOD } from "@shared/domain/order";
import { asID, asSubtotal } from "@shared/primitives";

import { selectCartTotal, clearCart } from "@/features/cart/model";

export function useCheckoutSubmit() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const total = useAppSelector(selectCartTotal);

    const submit = useCallback(
        async (values: CheckoutFormValues) => {
            if (values.paymentMethod === PAYMENT_METHOD.Online) {
                await new Promise((resolve) => setTimeout(resolve, 1200));
            }

            const orderId = asID(crypto.randomUUID());
            const totalSubtotal = asSubtotal(total);

            analytics.purchase({
                orderId,
                total: totalSubtotal,
                value: totalSubtotal,
            });

            await dispatch(clearCart()).unwrap();

            navigate(`/checkout/success?order=${orderId}`);
        },
        [dispatch, navigate, total],
    );

    return { submit };
}
