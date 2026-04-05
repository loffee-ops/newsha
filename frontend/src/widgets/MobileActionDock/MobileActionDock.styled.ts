import styled from "styled-components";

export const DockRoot = styled.div`
    position: fixed;
    left: 50%;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    transform: translateX(-50%);
    z-index: ${({ theme }) => theme.zIndex.floatingDock};

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    min-height: 60px;
    padding: 8px 12px;
    border-radius: 999px;

    position: fixed;
    overflow: hidden;
    isolation: isolate;

    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.16) 100%),
        rgba(210, 210, 210, 0.22);

    border: 4px solid rgba(255, 255, 255, 0.28);

    backdrop-filter: blur(22px) saturate(160%);
    -webkit-backdrop-filter: blur(22px) saturate(160%);

    box-shadow:
        0 8px 30px rgba(0, 0, 0, 0.1),
        0 2px 10px rgba(255, 255, 255, 0.14),
        inset 0 1px 0 rgba(255, 255, 255, 0.38),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12);

    &::before {
        content: "";
        position: absolute;
        inset: 1px;
        border-radius: inherit;
        pointer-events: none;

        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.08) 45%,
            rgba(255, 255, 255, 0.02) 100%
        );

        z-index: 0;
    }

    &::after {
        content: "";
        position: absolute;
        top: 6%;
        left: 8%;
        width: 84%;
        height: 42%;
        border-radius: 999px;
        pointer-events: none;

        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.42) 0%,
            rgba(255, 255, 255, 0.12) 55%,
            rgba(255, 255, 255, 0) 100%
        );

        filter: blur(8px);
        opacity: 0.9;
        z-index: 1;
    }

    > * {
        position: relative;
        z-index: 2;
    }
`;
