import styled from "styled-components";
import { Link } from "react-router-dom";

export const LogoLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    line-height: 1;
`;

export const LogoTextGroup = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    line-height: 1;
    transform: translateY(2px);
`;

export const LogoImage = styled.img`
    display: block;
    width: auto;
    height: 20px;
    object-fit: contain;
`;

export const LogoSubtitle = styled.span`
    display: block;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0.27em;
    text-transform: uppercase;
    color: #111111;
`;
