import styled, { keyframes } from "styled-components";

import type { SkeletonProps } from "./types";

const shimmer = keyframes`
  from {
    background-position: -200px 0;
  }
  to {
    background-position: 200px 0;
  }
`;

function toCssSize(value?: string | number) {
    if (value === undefined) return undefined;
    return typeof value === "number" ? `${value}px` : value;
}

export const SkeletonBlock = styled.div<SkeletonProps>`
    display: block;
    width: ${({ width }) => toCssSize(width) || "100%"};
    height: ${({ height }) => toCssSize(height) || "20px"};
    border-radius: ${({ radius }) => toCssSize(radius) || "8px"};

    background: linear-gradient(90deg, #e7e7e7 25%, #f3f3f3 50%, #e7e7e7 75%);
    background-size: 200px 100%;
    animation: ${shimmer} 1.2s linear infinite;
    will-change: background-position;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;
