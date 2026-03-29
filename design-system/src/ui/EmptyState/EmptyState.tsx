import { EMPTY_STATE_CONTENT } from "./texts";
import type { EmptyStateProps } from "./types";

import * as S from "./EmptyState.styled";

export function EmptyState({
    title = EMPTY_STATE_CONTENT.title,
    description = EMPTY_STATE_CONTENT.description,
    children,
}: EmptyStateProps) {
    return (
        <S.Wrapper role="status" aria-live="polite">
            <S.Title>{title}</S.Title>
            <S.Text>{description}</S.Text>
            {children && <S.Actions>{children}</S.Actions>}
        </S.Wrapper>
    );
}
