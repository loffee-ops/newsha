import styled from "styled-components";

import { flexCenter } from "@ds/theme/variables/mixins";

export const Wrapper = styled.div`
    min-height: 60vh;
    ${flexCenter};
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
`;

export const Title = styled.h2`
    margin: 0 0 12px;
    font-size: ${({ theme }) => theme.fontSizes.h4};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const Description = styled.p`
    margin: 0 0 24px;
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.gray};
`;

export const ActionButton = styled.button`
    padding: 10px 18px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    transition:
        transform 0.12s ease,
        opacity 0.12s ease;

    &:hover {
        opacity: 0.92;
    }

    &:active {
        transform: translateY(1px);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.black};
        outline-offset: 3px;
    }
`;
