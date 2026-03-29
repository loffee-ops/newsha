import { css } from "styled-components";

export const flex = css`
    display: flex;
`;

export const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const flexBetween = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`;

export const flexLeft = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const flexRight = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const headerGrid = css`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
`;
