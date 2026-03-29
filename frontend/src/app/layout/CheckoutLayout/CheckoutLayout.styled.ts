import styled from "styled-components";

import { flexColumn } from "@design-system/theme/variables/mixins";

export const LayoutWrapper = styled.div`
    min-height: 100vh;
    ${flexColumn};
    transition: background-color 0.35s ease;
`;

export const Content = styled.main.attrs({ id: "main-content" })`
    flex: 1;
    width: 100%;
    ${flexColumn};
`;
