import styled from "styled-components";

export const GlassIconButtonRoot = styled.button<{ $size: number }>`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: ${({ $size }) => `${$size}px`};
    height: ${({ $size }) => `${$size}px`};
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 50%;

    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.42) 0%,
        rgba(255, 255, 255, 0.18) 100%
    );

    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.11),
        inset 0 1px 0 rgba(255, 255, 255, 0.32),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08);

    cursor: pointer;
    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.24) 100%
        );
        border-color: rgba(255, 255, 255, 0.28);
        box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(255, 255, 255, 0.12);
    }

    &:active {
        transform: scale(0.96);
    }

    &:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.82);
        outline-offset: 2px;
    }
`;

export const GlassIconButtonContent = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;

    & > img,
    & > svg {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        flex-shrink: 0;
    }
`;
