import styled from "styled-components";

export const SearchBarRoot = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 60px;
    padding: 1px 6px;
    border-radius: 999px;

    border: 1px solid rgba(255, 255, 255, 0.24);

    background: rgba(224, 224, 224, 0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
`;

export const SearchBarInputWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.white};

    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const SearchBarIcon = styled.img`
    position: absolute;
    left: 16px;
    width: 18px;
    height: 18px;
    object-fit: contain;
    pointer-events: none;
    opacity: 0.7;
`;

export const SearchBarInput = styled.input`
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: 0 16px 0 44px;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
    font: inherit;

    &::placeholder {
        color: rgba(0, 0, 0, 0.45);
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
    }
`;
