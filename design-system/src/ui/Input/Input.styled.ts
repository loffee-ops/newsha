import styled from "styled-components";

export const StyledInputWrapper = styled.div``;

export const StyledInput = styled.div`
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
`;

export const StyledInputField = styled.input`
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    width: 100%;
    padding-left: 1rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #d9e8d8;
    color: #0d0c22;
    box-shadow:
        0 0 5px #c1d9bf,
        0 0 0 10px #f5f5f5eb;
    transition: 0.3s ease;

    &::placeholder {
        color: #777;
    }
`;
