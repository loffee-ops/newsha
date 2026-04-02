import { useTheme } from "styled-components";

import type { AppTheme } from "@ds/theme";
import { GlassIconButton } from "@ds/ui/GlassIconButton";

import { SEARCH_BUTTON_ARIA_LABEL } from "@/features/search/config";

import type { SearchButtonProps } from "./types";

export function SearchButton({ onClick, className }: SearchButtonProps) {
    const theme = useTheme() as AppTheme;

    return (
        <GlassIconButton
            icon={<img src={theme.assets.searchIcon} alt="" aria-hidden="true" />}
            {...(onClick ? { onClick } : {})}
            {...(className ? { className } : {})}
            aria-label={SEARCH_BUTTON_ARIA_LABEL}
        />
    );
}
