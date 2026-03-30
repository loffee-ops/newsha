import styled from "styled-components";

export const ButtonRoot = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.black};
    font: inherit;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.black};
        outline-offset: 4px;
    }
`;

export const IconBox = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.black};
`;

export const CartIconImage = styled.img`
    display: block;
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
`;

export const CountBadge = styled.span`
    position: absolute;
    top: -2px;
    right: -2px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
`;

export const CartLabel = styled.span`
    display: inline-block;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.black};

    @media ${({ theme }) => theme.media.tablet} {
        max-width: 140px;
    }
`;
