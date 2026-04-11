import React from "react";
import { useTheme } from "styled-components";
import { Button } from "./BurgerButton.styled";
import type { AppTheme } from "@ds/theme";

type BurgerButtonProps = {
    onClick?: () => void;
    className?: string;
};

export const BurgerButton: React.FC<BurgerButtonProps> = ({ onClick, className }) => {
    const theme = useTheme() as AppTheme;
    const DiscoverIcon = theme.assets.discoverIcon;

    return (
        <Button type="button" onClick={onClick} className={className} aria-label="Меню">
            <DiscoverIcon width={24} height={24} />
        </Button>
    );
};

export default BurgerButton;
