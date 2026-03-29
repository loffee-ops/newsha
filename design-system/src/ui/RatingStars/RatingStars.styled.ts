import styled from "styled-components";

import { flex } from "@ds/theme/variables/mixins";

export const RatingWrapper = styled.div`
    ${flex};
    align-items: center;
    gap: 4px;
    line-height: 1;
`;

export const Stars = styled.div`
    ${flex};
    gap: 1px;
`;

export const Star = styled.span`
    position: relative;
    ${flex};
    align-items: center;
    line-height: 1;
    font-size: ${({ theme }) => theme.fontSizes.body};

    .empty {
        color: ${({ theme }) => theme.colors.star};
    }
`;

export const Fill = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.star};
    line-height: 1;
    pointer-events: none;
`;

export const RatingValue = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.caption};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 1;
`;

export const RatingCount = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.caption};
    color: ${({ theme }) => theme.colors.gray};
    line-height: 1;
`;
