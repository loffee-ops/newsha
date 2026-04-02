import { useTheme } from "styled-components";

import type { AppTheme } from "@ds/theme";
import { GlassIconButton } from "@ds/ui/GlassIconButton";

import { useAppDispatch, useAppSelector } from "@/app/store";

import { openLoginModal, selectIsAuthenticated } from "@/features/auth/model";
import { WISHLIST_BUTTON_ARIA_LABEL } from "@/features/wishlist/config";

import type { WishlistButtonProps } from "./types";

export function WishlistButton({ onClick, className }: WishlistButtonProps) {
    const theme = useTheme() as AppTheme;
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const handleClick = () => {
        if (!isAuthenticated) {
            dispatch(openLoginModal());
            return;
        }

        onClick?.();
    };

    return (
        <GlassIconButton
            icon={<img src={theme.assets.heartIcon} alt="" aria-hidden="true" />}
            onClick={handleClick}
            aria-label={WISHLIST_BUTTON_ARIA_LABEL}
            {...(className ? { className } : {})}
        />
    );
}
