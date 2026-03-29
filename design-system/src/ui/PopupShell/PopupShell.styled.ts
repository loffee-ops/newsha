import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Card = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    background: rgba(38, 42, 48, 0.12);
    backdrop-filter: blur(26px);
    -webkit-backdrop-filter: blur(26px);

    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;

    box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.04),
        0 0 24px rgba(0, 0, 0, 0.1),
        0 0 48px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);

    animation: ${fadeIn} 0.22s ease-out;
`;

export const Inner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 12px;
`;

export const TopBlock = styled.div`
    width: 100%;
`;

export const BottomBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-top: 2px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 6px;
    padding: 10px 0 0;
    padding-right: 36px;
`;

export const Title = styled.h2`
    margin: 0;
    color: #242424;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 1.2;
`;

export const SubTitle = styled.p`
    margin: 0;
    color: rgba(36, 36, 36, 0.78);
    font-size: 13px;
    line-height: 1.45;
`;

export const Separator = styled.div`
    width: 100%;
    height: 1px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.02) 0%,
        rgba(255, 255, 255, 0.12) 50%,
        rgba(255, 255, 255, 0.02) 100%
    );
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Actions = styled.div`
    width: 100%;
    display: flex;
    align-items: stretch;
    gap: 12px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

export const ActionButton = styled.button<{
    $variant: "primary" | "secondary" | "danger" | "ghost";
}>`
    flex: 1 1 0;
    min-height: 40px;
    padding: 10px 14px;
    border-radius: 14px;
    cursor: pointer;
    font-size: 14px;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    border: 1px solid
        ${({ $variant }) => ($variant === "ghost" ? "rgba(255, 255, 255, 0.12)" : "transparent")};

    background: ${({ $variant }) => {
        switch ($variant) {
            case "primary":
                return "rgba(36, 36, 36, 0.92)";
            case "secondary":
                return "rgba(255, 255, 255, 0.08)";
            case "danger":
                return "rgba(36, 36, 36, 0.92)";
            case "ghost":
                return "transparent";
            default:
                return "rgba(255, 255, 255, 0.08)";
        }
    }};

    color: ${({ $variant }) =>
        $variant === "primary" || $variant === "danger" ? "#ffffff" : "#242424"};

    &:hover {
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 4px 10px rgba(0, 0, 0, 0.08);
        background: ${({ $variant }) => {
            switch ($variant) {
                case "primary":
                    return "rgba(24, 24, 24, 0.96)";
                case "secondary":
                    return "rgba(255, 255, 255, 0.12)";
                case "danger":
                    return "rgba(24, 24, 24, 0.96)";
                case "ghost":
                    return "rgba(255, 255, 255, 0.05)";
                default:
                    return "rgba(255, 255, 255, 0.12)";
            }
        }};
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 1;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    }

    &:focus-visible {
        outline: none;
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.12),
            0 0 0 3px rgba(190, 200, 214, 0.18);
    }
`;

export const CloseIcon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 1;
    color: #242424;
`;
