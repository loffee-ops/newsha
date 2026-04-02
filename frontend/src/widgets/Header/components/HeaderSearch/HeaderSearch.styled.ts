import styled from "styled-components";

export const HeaderSearchRoot = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

export const HeaderSearchOverlay = styled.button`
    position: fixed;
    inset: 0;
    border: none;
    background: transparent;
    padding: 0;
    cursor: default;
`;

export const HeaderSearchInner = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0 20px 0;
`;
