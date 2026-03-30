import styled from "styled-components";

export const ButtonRoot = styled.button`
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

export const AvatarBox = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.black};
`;

export const AvatarImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const AvatarInitial = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
`;

export const UserIconImage = styled.img`
    display: block;
    width: 22px;
    height: 22px;
    object-fit: contain;
    filter: brightness(0) invert(1);
`;

export const UserLabel = styled.span`
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
