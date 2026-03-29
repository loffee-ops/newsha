import styled from "styled-components";

export const Root = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    min-height: 40px;
    padding: 4px;
    gap: 10px;
    border-radius: 16px;
    background-color: #ffffff;
    box-sizing: border-box;
`;

export const OptionLabel = styled.label`
    flex: 1 1 0;
    display: flex;
    min-width: 0;
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const Item = styled.span`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    user-select: none;
    color: #242424;
    font-size: 14px;
    transition:
        background-color 0.3s ease,
        color 0.3s ease,
        font-weight 0.3s ease;

    ${HiddenInput}:checked + & {
        background-color: #242424;
        color: #fff;
        font-weight: 600;
    }

    ${HiddenInput}:disabled + & {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
