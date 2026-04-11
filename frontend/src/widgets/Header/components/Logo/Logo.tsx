import React from "react";
import { StyledLogo, LogoImage } from "./Logo.styled";

import type { LogoProps } from "./logo.types";

export const Logo: React.FC<LogoProps> = ({ className, alt = "Newsha logo", href = "/" }) => {
    return (
        <StyledLogo className={className} href={href}>
            <LogoImage alt={alt} />
        </StyledLogo>
    );
};

export default Logo;
