import styled, { css } from "styled-components";
import type { TooltipPlacement } from "./types";

type StyledTooltipContentProps = {
    $placement: TooltipPlacement;
    $hasArrow: boolean;
};

const placementStyles: Record<TooltipPlacement, ReturnType<typeof css>> = {
    top: css`
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);

        &::after {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: #28282817 transparent transparent transparent;
        }
    `,
    bottom: css`
        top: 125%;
        left: 50%;
        transform: translateX(-50%);

        &::after {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent transparent #28282817 transparent;
        }
    `,
    left: css`
        right: 125%;
        top: 50%;
        transform: translateY(-50%);

        &::after {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent transparent transparent #28282817;
        }
    `,
    right: css`
        left: 125%;
        top: 50%;
        transform: translateY(-50%);

        &::after {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent #28282817 transparent transparent;
        }
    `,
};

export const StyledTooltip = styled.div`
    position: relative;
    display: inline-block;
`;

export const StyledTooltipTrigger = styled.div`
    display: inline-block;
`;

export const StyledTooltipContent = styled.div<StyledTooltipContentProps>`
    visibility: hidden;
    width: 200px;
    background-color: #28282817;
    color: #282828;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;

    ${({ $placement }) => placementStyles[$placement]}

    &::after {
        content: "";
        position: absolute;
        display: ${({ $hasArrow }) => ($hasArrow ? "block" : "none")};
    }

    ${StyledTooltip}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;
