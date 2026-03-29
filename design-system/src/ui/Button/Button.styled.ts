import styled, { css, keyframes } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./types";

type StyledButtonProps = {
    variant: ButtonVariant;
    size: ButtonSize;
    fullWidth: boolean;
    isActive: boolean;
};

type IconContainerProps = {
    $position: "left" | "right";
};

const floatIcon = keyframes`
    0% {
        transform: translateX(0);
        opacity: 0.7;
    }
    100% {
        transform: translateX(6px);
        opacity: 1;
    }
`;

const sizeStyles = {
    sm: css`
        min-height: 42px;
        padding: 4px 6px;
        min-width: 150px;
        font-size: 14px;
    `,
    md: css`
        min-height: 50px;
        padding: 4px 6px;
        min-width: 170px;
        font-size: 16px;
    `,
    lg: css`
        min-height: 58px;
        padding: 5px 7px;
        min-width: 190px;
        font-size: 18px;
    `,
};

const variantStyles = {
    primary: css`
        background-color: #1d2129;
        color: #ffffff;
        border: none;
    `,
    secondary: css`
        background-color: #ffffff;
        color: #1d2129;
        border: 1px solid #1d2129;
    `,
    ghost: css`
        background-color: transparent;
        color: #1d2129;
        border: 1px solid #d9d9d9;
        box-shadow: none;
    `,
};

export const ButtonIconContainer = styled.span<IconContainerProps>`
    width: 45px;
    height: 45px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #ffffff;
    border: 3px solid #1d2129;

    svg {
        width: 18px;
        height: 18px;
        transition: transform 0.3s ease;
    }
`;

export const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
    border-radius: 999px;
    box-shadow: 0 5px 10px #bebebe;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;

    ${({ size }) => sizeStyles[size]}
    ${({ variant }) => variantStyles[variant]}

    ${({ isActive }) =>
        isActive &&
        css`
            transform: translateY(-1px);
        `}

    &:hover {
        transform: translateY(-1px);
    }

    &:hover ${ButtonIconContainer} svg {
        animation: ${floatIcon} 0.8s linear infinite alternate;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

export const ButtonText = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-inline: 18px;
    white-space: nowrap;
    letter-spacing: 0.04em;
    font-weight: 500;
`;
