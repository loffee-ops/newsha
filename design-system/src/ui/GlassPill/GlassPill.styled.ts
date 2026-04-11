import styled from "styled-components";

type PillStyledProps = {
    $padding?: string;
    $minHeight?: string;
    $radius?: string;
    $background?: string;
    $border?: string;
    $shadow?: string;
    $blur?: string;
    $width?: string;
    $display?: string;
    $justify?: string;
};

export const Pill = styled.div<PillStyledProps>`
    min-height: ${({ $minHeight }) => $minHeight || "72px"};
    width: ${({ $width }) => $width || "auto"};
    padding: ${({ $padding }) => $padding || "12px 24px"};
    border-radius: ${({ $radius }) => $radius || "999px"};

    display: ${({ $display }) => $display || "inline-flex"};
    align-items: center;
    justify-content: ${({ $justify }) => $justify || "center"};

    background: ${({ $background }) => $background || "rgba(255, 255, 255, 0.45)"};
    backdrop-filter: blur(${({ $blur }) => $blur || "20px"});
    -webkit-backdrop-filter: blur(${({ $blur }) => $blur || "20px"});

    border: ${({ $border }) => $border || "1px solid rgba(255, 255, 255, 0.55)"};

    box-shadow: ${({ $shadow }) =>
        $shadow ||
        `
        0 12px 30px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.75)
    `};
`;
