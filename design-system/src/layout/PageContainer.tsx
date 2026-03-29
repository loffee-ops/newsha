import type { ReactNode } from "react";

import { StyledPageContainer } from "./PageContainer.styled";

type Props = {
    children: ReactNode;
};

export function PageContainer({ children }: Props) {
    return <StyledPageContainer>{children}</StyledPageContainer>;
}
