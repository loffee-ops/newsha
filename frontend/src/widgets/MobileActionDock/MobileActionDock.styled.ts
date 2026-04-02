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

    background: rgba(224, 224, 224, 0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    box-shadow:
        0 0 12px rgba(255, 255, 255, 0.14),
        0 0 26px rgba(0, 0, 0, 0.06),
        0 0 46px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
`;
