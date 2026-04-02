import { useTheme } from "styled-components";

import type { AppTheme } from "@ds/theme";
import { GlassIconButton } from "@ds/ui/GlassIconButton";

import { BURGER_BUTTON_ARIA_LABEL } from "@/features/burger/config";

import type { BurgerButtonProps } from "./types/burger-button.types";

export function BurgerButton({ onClick, className }: BurgerButtonProps) {
    const theme = useTheme() as AppTheme;

    return (
        <GlassIconButton
            icon={<img src={theme.assets.moreIcon} alt="" aria-hidden="true" />}
            {...(onClick ? { onClick } : {})}
            {...(className ? { className } : {})}
            aria-label={BURGER_BUTTON_ARIA_LABEL}
        />
    );
}
