import styled, { css, keyframes } from "styled-components";
import type { LoaderSize } from "./types";

type StyledLoaderProps = {
    $size: LoaderSize;
    $fullScreen: boolean;
};

const scaleUp = keyframes`
    20% {
        background-color: #000000;
        transform: scaleY(1.5);
    }

    40% {
        transform: scaleY(1);
    }
`;

export const StyledLoaderBar = styled.span`
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    animation: ${scaleUp} 1s linear infinite;

    &:nth-child(2) {
        height: 35px;
        margin: 0 5px;
        animation-delay: 0.25s;
    }

    &:nth-child(3) {
        animation-delay: 0.5s;
    }
`;

const sizeStyles: Record<LoaderSize, ReturnType<typeof css>> = {
    sm: css`
        ${StyledLoaderBar} {
            width: 2px;
            height: 14px;
        }

        ${StyledLoaderBar}:nth-child(2) {
            height: 24px;
            margin: 0 4px;
        }
    `,
    md: css`
        ${StyledLoaderBar} {
            width: 3px;
            height: 20px;
        }

        ${StyledLoaderBar}:nth-child(2) {
            height: 35px;
            margin: 0 5px;
        }
    `,
    lg: css`
        ${StyledLoaderBar} {
            width: 4px;
            height: 28px;
        }

        ${StyledLoaderBar}:nth-child(2) {
            height: 44px;
            margin: 0 6px;
        }
    `,
};

export const StyledLoader = styled.div<StyledLoaderProps>`
    display: flex;
    align-items: center;

    ${({ $fullScreen }) =>
        $fullScreen &&
        css`
            width: 100%;
            min-height: 100vh;
            justify-content: center;
        `}

    ${({ $size }) => sizeStyles[$size]}
`;
