import * as S from "./ErrorView.styled";
import type { ErrorViewProps } from "./types";

export function ErrorView({
    title,
    description,
    actionLabel,
    onAction,
    className,
}: ErrorViewProps) {
    return (
        <S.Wrapper className={className}>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>

            {actionLabel && onAction ? (
                <S.ActionButton type="button" onClick={onAction}>
                    {actionLabel}
                </S.ActionButton>
            ) : null}
        </S.Wrapper>
    );
}
