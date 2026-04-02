import styled from "styled-components";

export const HeaderRoot = styled.header`
    position: relative;
    width: 100%;
    overflow: visible;
`;

export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 70px;
    padding: 8px 20px;
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    padding: 4px;
    border: none;
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
