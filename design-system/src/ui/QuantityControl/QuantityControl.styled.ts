import styled from "styled-components";

export const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const Control = styled.div`
    display: inline-flex;
    align-items: center;
    min-width: 152px;
    height: 48px;
    border: 1px solid #d8d8d8;
    border-radius: 16px;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.98) 0%,
        rgba(248, 248, 248, 0.98) 100%
    );
    box-shadow:
        0 8px 24px rgba(17, 24, 39, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
    overflow: hidden;
`;

export const Button = styled.button`
    flex: 0 0 40px;
    width: 40px;
    height: 48px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors?.graphite ?? "#1f2937"};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.15s ease,
        opacity 0.2s ease;

    &:hover:not(:disabled) {
        background: rgba(17, 24, 39, 0.04);
    }

    &:active:not(:disabled) {
        transform: scale(0.96);
    }

    &:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 2px rgba(17, 24, 39, 0.14);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.38;
    }
`;

export const DecrementButton = styled(Button)`
    border-right: 1px solid #d8d8d8;
`;

export const IncrementButton = styled(Button)`
    border-left: 1px solid #d8d8d8;
`;

export const ValueBox = styled.span`
    flex: 1 1 auto;
    min-width: 72px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-inline: 16px;
    background: transparent;
    color: ${({ theme }) => theme.colors?.graphite ?? "#111827"};
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.02em;
    user-select: none;
`;

export const Icon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 20px;
    line-height: 1;
`;
