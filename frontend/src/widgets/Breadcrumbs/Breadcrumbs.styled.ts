import styled from "styled-components";

export const Wrapper = styled.nav`
    margin: 20px 0;
`;

export const List = styled.ol`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const Item = styled.li<{ $active?: boolean }>`
    font-size: 14px;
    color: ${({ $active }) => ($active ? "#242424" : "#777777")};
    font-weight: ${({ $active }) => ($active ? 500 : 400)};

    a {
        text-decoration: none;
        color: inherit;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const Separator = styled.span`
    margin: 0 6px;
`;
