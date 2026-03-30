import { useTheme } from "styled-components";

import type { AppTheme } from "@design-system/theme";

import { ButtonRoot, IconBox, CartIconImage, CountBadge, CartLabel } from "./CartButton.styled";

type CartButtonProps = {
    count?: number;
    onClick?: () => void;
    className?: string;
    showLabel?: boolean;
    label?: string;
};

export function CartButton({
    count = 0,
    onClick,
    className,
    showLabel = false,
    label = "Cart",
}: CartButtonProps) {
    const theme = useTheme() as AppTheme;
    const shoppingBagIcon = theme.assets.shoppingBag;
    const hasCount = count > 0;

    return (
        <ButtonRoot
            type="button"
            onClick={onClick}
            aria-label={hasCount ? `${label}, ${count} items` : label}
            {...(className ? { className } : {})}
        >
            <IconBox>
                <CartIconImage src={shoppingBagIcon} alt="" aria-hidden="true" />

                {hasCount ? <CountBadge>{count > 99 ? "99+" : count}</CountBadge> : null}
            </IconBox>

            {showLabel ? <CartLabel>{label}</CartLabel> : null}
        </ButtonRoot>
    );
}
