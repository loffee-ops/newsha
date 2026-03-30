import { useTheme } from "styled-components";

import type { AppTheme } from "@design-system/theme";

import { ROUTES } from "@/app/navigation/config";

import { LogoImage, LogoLink, LogoSubtitle, LogoTextGroup } from "./Logo.styled";

export function Logo() {
    const theme = useTheme() as AppTheme;

    return (
        <LogoLink to={ROUTES.HOME} aria-label="Перейти на главную страницу">
            <LogoTextGroup>
                <LogoImage src={theme.assets.logo.blackLogo} alt="Newsha" width={140} height={32} />
                <LogoSubtitle>professional hair</LogoSubtitle>
            </LogoTextGroup>
        </LogoLink>
    );
}
