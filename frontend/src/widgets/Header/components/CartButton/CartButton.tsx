import React from "react";
import { useTheme } from "styled-components";
import { Button, Icon } from "./CartButton.styled";
import type { AppTheme } from "@ds/theme";

type CartButtonProps = {
    onClick?: () => void;
    className?: string;
};

export const CartButton: React.FC<CartButtonProps> = ({ onClick, className }) => {
    const theme = useTheme() as AppTheme;

    return (
        <Button type="button" onClick={onClick} className={className}>
            <Icon src={theme.assets.shoppingBag} alt="Кошик" />
        </Button>
    );
};

export default CartButton;
