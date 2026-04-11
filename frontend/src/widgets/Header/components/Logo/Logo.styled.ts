import styled from "styled-components";

export const StyledLogo = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

export const LogoImage = styled.img.attrs(({ theme }) => ({
    src: theme.assets.logo.blackLogo,
}))`
    display: block;
    height: 22px;
    object-fit: cover;
`;