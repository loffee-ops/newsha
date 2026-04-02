import { useTheme } from "styled-components";

import type { AppTheme } from "@ds/theme";

import { useAppDispatch, useAppSelector } from "@/app/store";

import { openCart, selectCartCount } from "@/features/cart/model";
import { CART_BUTTON_ARIA_LABEL } from "@/features/cart/config";

import type { CartButtonProps } from "./types";
import { CartButtonRoot, CartBadge } from "./CartButton.styled";

export function CartButton({ onClick, className }: CartButtonProps) {
    const theme = useTheme() as AppTheme;
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCartCount);

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        dispatch(openCart());
    };

    const badgeCount = Number(count);
    const ariaLabel =
        badgeCount > 0
            ? `${CART_BUTTON_ARIA_LABEL}, товарів: ${badgeCount}`
            : CART_BUTTON_ARIA_LABEL;

    return (
        <CartButtonRoot
            size={46}
            icon={<img src={theme.assets.shoppingBag} alt="" aria-hidden="true" />}
            onClick={handleClick}
            aria-label={ariaLabel}
            {...(className ? { className } : {})}
        >
            {badgeCount > 0 ? <CartBadge>{badgeCount}</CartBadge> : null}
        </CartButtonRoot>
    );
}
