import { useTheme } from "styled-components";

import type { AppTheme } from "@ds/theme";
import { GlassIconButton } from "@ds/ui/GlassIconButton";

import { useAppDispatch, useAppSelector } from "@/app/store";

import { openLoginModal, selectIsAuthenticated } from "@/features/auth/model/";
import { AUTH_BUTTON_ARIA_LABELS } from "@/features/auth/config";

import type { AuthButtonProps } from "./types";

export function AuthButton({ onClick, className }: AuthButtonProps) {
    const theme = useTheme() as AppTheme;
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const handleClick = () => {
        if (isAuthenticated) {
            onClick?.();
            return;
        }

        dispatch(openLoginModal());
    };

    return (
        <GlassIconButton
            icon={<img src={theme.assets.userIcon} alt="" aria-hidden="true" />}
            onClick={handleClick}
            aria-label={
                isAuthenticated ? AUTH_BUTTON_ARIA_LABELS.user : AUTH_BUTTON_ARIA_LABELS.guest
            }
            {...(className ? { className } : {})}
        />
    );
}
