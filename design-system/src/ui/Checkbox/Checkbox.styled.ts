import styled, { css, keyframes } from "styled-components";
import type { CheckboxSize } from "./types";

const checkAnimation = keyframes`
  50% {
    transform: scale(1.2);
  }
`;

const checkboxSizes: Record<CheckboxSize, ReturnType<typeof css>> = {
    sm: css`
        width: 20px;
        height: 20px;
    `,
    md: css`
        width: 24px;
        height: 24px;
    `,
    lg: css`
        width: 28px;
        height: 28px;
    `,
};

export const StyledCheckbox = styled.div`
    position: relative;
`;

export const StyledCheckboxInput = styled.input<{ $checkboxSize: CheckboxSize }>`
    display: none;

    &:hover + label span:first-child {
        border-color: #2f8f5b;
    }

    &:checked + label span:first-child {
        border-color: #2f8f5b;
        background: #2f8f5b;
        animation: ${checkAnimation} 0.6s ease;
    }

    &:checked + label span:first-child svg {
        stroke-dashoffset: 0;
    }

    &:checked + label span:first-child::before {
        transform: scale(2.2);
        opacity: 0;
        transition: all 0.6s ease;
    }

    &:checked + label span:last-child {
        color: #b9b8c3;
        transition: all 0.3s ease;
    }

    &:checked + label span:last-child::after {
        transform: scaleX(1);
        transition: all 0.3s ease;
    }
`;

export const StyledCheckboxLabel = styled.label`
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
`;

export const StyledCheckboxBox = styled.span<{ $checkboxSize: CheckboxSize }>`
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
    position: relative;
    border-radius: 50%;
    transform: scale(1);
    border: 1px solid #b9b8c3;
    transition: all 0.2s ease;

    ${({ $checkboxSize }) => checkboxSizes[$checkboxSize]}

    &::before {
        content: "";
        width: 100%;
        height: 100%;
        background: #4caf50;
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
        transition-delay: 0.2s;
    }
`;

export const StyledCheckboxMark = styled.svg`
    position: absolute;
    z-index: 1;
    top: 8px;
    left: 6px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
    width: 12px;
    height: 9px;
`;

export const StyledCheckboxText = styled.span`
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
    margin-left: 8px;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 8px;
        left: 0;
        height: 1px;
        width: 100%;
        background: #b9b8c3;
        transform-origin: 0 0;
        transform: scaleX(0);
    }
`;
