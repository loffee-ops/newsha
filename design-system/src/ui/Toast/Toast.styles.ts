import styled, { keyframes } from "styled-components";

import { TOAST_BG, TOAST_DOT } from "./config";
import type { ToastType } from "./types";

const toastIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.96);
    filter: blur(2px);
  }

  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
    filter: blur(0);
  }

  100% {
    transform: translateY(0) scale(1);
  }
`;

export const Stack = styled.div`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 2500;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;

    @media (max-width: 640px) {
        left: 50%;
        right: auto;
        bottom: 18px;
        transform: translateX(-50%);
        width: calc(100vw - 32px);
    }
`;

export const ToastItem = styled.div<{ $type: ToastType }>`
    min-width: 240px;
    max-width: 360px;
    padding: 12px 16px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: #0f172a;
    background: ${({ $type }) => TOAST_BG[$type]};
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);

    box-shadow:
        0 12px 28px rgba(0, 0, 0, 0.18),
        0 0 0 1px rgba(255, 255, 255, 0.75) inset,
        0 -1px 0 rgba(255, 255, 255, 0.4) inset;

    animation: ${toastIn} 420ms cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
    transition:
        transform 0.2s ease,
        opacity 0.2s ease;

    &:hover {
        transform: translateY(-1px) scale(1.02);
    }
`;

export const ToastDot = styled.span<{ $type: ToastType }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $type }) => TOAST_DOT[$type]};
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.6);
    flex-shrink: 0;
`;

export const Message = styled.div`
    overflow-wrap: anywhere;
`;
