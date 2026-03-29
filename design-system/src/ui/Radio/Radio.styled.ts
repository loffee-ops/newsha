import styled, { css } from "styled-components";
import type { RadioSize, RadioVariant } from "./types";

type StyledRadioProps = {
    $radioSize: RadioSize;
    $variant: RadioVariant;
};

const controlSizes: Record<RadioSize, ReturnType<typeof css>> = {
    sm: css`
        width: 16px;
        height: 16px;
    `,
    md: css`
        width: 20px;
        height: 20px;
    `,
    lg: css`
        width: 24px;
        height: 24px;
    `,
};

const iconSizes: Record<RadioSize, ReturnType<typeof css>> = {
    sm: css`
        width: 36px;
        height: 36px;
    `,
    md: css`
        width: 44px;
        height: 44px;
    `,
    lg: css`
        width: 52px;
        height: 52px;
    `,
};

export const StyledRadio = styled.div`
    position: relative;
    display: inline-flex;
`;

export const StyledRadioInput = styled.input`
    position: absolute;
    opacity: 0;
    pointer-events: none;

    &:checked + label {
        color: #111;
    }

    &:disabled + label {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const StyledRadioControl = styled.span<StyledRadioProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #b9b8c3;
    border-radius: 50%;
    transition: all 0.2s ease;
    flex-shrink: 0;

    ${({ $variant, $radioSize }) =>
        $variant === "default" ? controlSizes[$radioSize] : iconSizes[$radioSize]}

    ${({ $variant }) =>
        $variant !== "default" &&
        css`
            border-radius: 12px;
        `}

    &::after {
        content: "";
        position: absolute;
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background: #2f8f5b;
        transform: scale(0);
        opacity: 0;
        transition: all 0.2s ease;
    }

    ${({ $variant }) =>
        $variant !== "default" &&
        css`
            &::after {
                display: none;
            }
        `}
`;

export const StyledRadioText = styled.span`
    font-size: 14px;
    line-height: 1.2;
    color: #222;
`;

export const StyledRadioLabel = styled.label<StyledRadioProps>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;

    ${({ $variant, $radioSize }) =>
        $variant === "icon" &&
        css`
            ${StyledRadioText} {
                display: none;
            }

            ${StyledRadioControl} {
                ${iconSizes[$radioSize]}
            }
        `}

    ${({ $variant }) =>
        $variant === "card" &&
        css`
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid transparent;
            background: transparent;
            gap: 10px;
        `}

    ${({ $variant }) =>
        $variant === "default" &&
        css`
            ${StyledRadioControl}::after {
                transform: scale(0);
                opacity: 0;
            }
        `}
`;

export const StyledRadioItem = styled.div<StyledRadioProps>`
    ${StyledRadioInput}:checked + ${StyledRadioLabel} ${StyledRadioControl} {
        border-color: #2f8f5b;
    }

    ${StyledRadioInput}:checked + ${StyledRadioLabel} ${StyledRadioControl}::after {
        transform: scale(1);
        opacity: 1;
    }

    ${({ $variant }) =>
        ($variant === "icon" || $variant === "card") &&
        css`
            ${StyledRadioInput}:checked + ${StyledRadioLabel} ${StyledRadioControl} {
                border-color: #2f8f5b;
                background: rgba(47, 143, 91, 0.08);
            }
        `}
`;
