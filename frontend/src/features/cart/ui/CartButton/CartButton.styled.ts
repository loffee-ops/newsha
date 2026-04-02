import styled from "styled-components";
import { GlassIconButton } from "@design-system/ui/GlassIconButton";

export const CartButtonRoot = styled(GlassIconButton)``;

export const CartBadge = styled.span`
    position: absolute;
    top: -2px;
    right: -2px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;

    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};

    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
    pointer-events: none;
`;
