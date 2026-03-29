import styled, { css, keyframes } from "styled-components";

type StyledModalProps = {
    $size: "xs" | "sm" | "md" | "lg" | "xl" | "fullscreen";
    $animation: "fade" | "scale" | "slide-up" | "slide-right";
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUpIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

function getModalWidth(size: StyledModalProps["$size"]) {
    switch (size) {
        case "xs":
            return "320px";
        case "sm":
            return "380px";
        case "md":
            return "460px";
        case "lg":
            return "560px";
        case "xl":
            return "720px";
        case "fullscreen":
            return "100vw";
        default:
            return "460px";
    }
}

function getAnimation(animation: StyledModalProps["$animation"]) {
    switch (animation) {
        case "fade":
            return fadeIn;
        case "scale":
            return scaleIn;
        case "slide-up":
            return slideUpIn;
        case "slide-right":
            return slideRightIn;
        default:
            return scaleIn;
    }
}

export const Backdrop = styled.div<{ $zIndex: number }>`
    position: fixed;
    inset: 0;
    z-index: ${({ $zIndex }) => $zIndex};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(13, 16, 20, 0.34);
    animation: ${fadeIn} 0.18s ease;
`;

export const Dialog = styled.div<StyledModalProps>`
    width: min(100%, ${({ $size }) => getModalWidth($size)});
    max-height: calc(100vh - 32px);
    overflow: auto;
    animation: ${({ $animation }) => getAnimation($animation)} 0.2s ease;

    ${({ $size }) =>
        $size === "fullscreen" &&
        css`
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            padding: 0;
            border-radius: 0;
        `}
`;
