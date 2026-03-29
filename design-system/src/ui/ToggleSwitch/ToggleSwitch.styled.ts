import styled, { css } from "styled-components";
import type { ToggleSwitchLabelPosition, ToggleSwitchSize } from "./types";

type StyledToggleContainerProps = {
    $labelPosition: ToggleSwitchLabelPosition;
};

type StyledToggleInnerProps = {
    $switchSize: ToggleSwitchSize;
};

type StyledToggleSliderProps = {
    $switchSize: ToggleSwitchSize;
};

const switchSizes: Record<ToggleSwitchSize, ReturnType<typeof css>> = {
    sm: css`
        width: 43px;
        height: 25px;
    `,
    md: css`
        width: 51px;
        height: 31px;
    `,
    lg: css`
        width: 59px;
        height: 35px;
    `,
};

const sliderSizes: Record<ToggleSwitchSize, ReturnType<typeof css>> = {
    sm: css`
        width: 21px;
        height: 21px;
        left: calc(50% - 21px / 2 - 9px);
        top: calc(50% - 21px / 2);
    `,
    md: css`
        width: 27px;
        height: 27px;
        left: calc(50% - 27px / 2 - 10px);
        top: calc(50% - 27px / 2);
    `,
    lg: css`
        width: 31px;
        height: 31px;
        left: calc(50% - 31px / 2 - 12px);
        top: calc(50% - 31px / 2);
    `,
};

const checkedSliderPositions: Record<ToggleSwitchSize, ReturnType<typeof css>> = {
    sm: css`
        left: calc(50% - 21px / 2 + 9px);
        top: calc(50% - 21px / 2);
    `,
    md: css`
        left: calc(50% - 27px / 2 + 10px);
        top: calc(50% - 27px / 2);
    `,
    lg: css`
        left: calc(50% - 31px / 2 + 12px);
        top: calc(50% - 31px / 2);
    `,
};

export const StyledToggleContainer = styled.div<StyledToggleContainerProps>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-direction: row;
`;

export const StyledToggleInner = styled.div<StyledToggleInnerProps>`
    position: relative;
    ${({ $switchSize }) => switchSizes[$switchSize]}
`;

export const StyledToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;

    &:checked + label {
        background-color: #34c759;
    }
`;

export const StyledToggleLabel = styled.label`
    width: 100%;
    height: 100%;
    display: block;
    background-color: #e9e9eb;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease-out;
`;

export const StyledToggleSlider = styled.span<StyledToggleSliderProps>`
    position: absolute;
    border-radius: 50%;
    background: #ffffff;
    box-shadow:
        0px 3px 8px rgba(0, 0, 0, 0.15),
        0px 3px 1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-out;
    cursor: pointer;

    ${({ $switchSize }) => sliderSizes[$switchSize]}

    ${StyledToggleInput}:checked + ${StyledToggleLabel} & {
        ${({ $switchSize }) => checkedSliderPositions[$switchSize]}
    }
`;

export const StyledToggleText = styled.span``;
