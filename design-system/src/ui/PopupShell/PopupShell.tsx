import type { PopupShellProps } from "./types";
import * as S from "./PopupShell.styled";

export function PopupShell({
    title,
    subTitle,
    topSlot,
    bottomSlot,
    actions,
    closable = false,
    onClose,
    children,
    className,
}: PopupShellProps) {
    return (
        <S.Card className={className}>
            {closable && (
                <S.CloseButton type="button" onClick={onClose} aria-label="Close">
                    <S.CloseIcon aria-hidden="true">×</S.CloseIcon>
                </S.CloseButton>
            )}

            <S.Inner>
                {topSlot ? <S.TopBlock>{topSlot}</S.TopBlock> : null}

                {(title || subTitle) && (
                    <>
                        <S.Header>
                            {title ? <S.Title>{title}</S.Title> : null}
                            {subTitle ? <S.SubTitle>{subTitle}</S.SubTitle> : null}
                        </S.Header>

                        <S.Separator />
                    </>
                )}

                <S.Content>{children}</S.Content>

                {bottomSlot ? (
                    <>
                        <S.Separator />
                        <S.BottomBlock>{bottomSlot}</S.BottomBlock>
                    </>
                ) : null}

                {!!actions?.length && (
                    <>
                        <S.Separator />
                        <S.Actions>
                            {actions.map((action) => (
                                <S.ActionButton
                                    key={action.label}
                                    type="button"
                                    $variant={action.variant ?? "secondary"}
                                    onClick={action.onClick}
                                >
                                    {action.label}
                                </S.ActionButton>
                            ))}
                        </S.Actions>
                    </>
                )}
            </S.Inner>
        </S.Card>
    );
}
