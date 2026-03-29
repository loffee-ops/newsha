import { createPortal } from "react-dom";

import { PopupShell } from "@ds/ui/PopupShell";
import { useBodyScrollLock, useEscapeKey, useOnOpen } from "./hooks";
import type { ModalCloseReason, ModalProps } from "./types";
import * as S from "./Modal.styled";

function createCloseHandler(onClose: ModalProps["onClose"], reason: ModalCloseReason) {
    return () => {
        onClose?.(reason);
    };
}

export function Modal({
    id,
    isOpen,
    title,
    subTitle,
    children,
    topSlot,
    bottomSlot,
    actions,
    size = "sm",
    animation = "scale",
    closable = true,
    backdropClosable = true,
    scrollbarLock = true,
    closeOnEscape = true,
    zIndex = 2000,
    onOpen,
    onClose,
}: ModalProps) {
    useOnOpen({
        isOpen,
        ...(onOpen != null ? { onOpen } : {}),
    });

    useBodyScrollLock({
        enabled: isOpen && scrollbarLock,
    });

    useEscapeKey({
        enabled: isOpen && closeOnEscape,
        onEscape: () => onClose?.("escape"),
    });

    if (!isOpen) return null;

    function handleBackdropClick() {
        if (backdropClosable) {
            onClose?.("backdrop");
        }
    }

    function handleDialogClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    return createPortal(
        <S.Backdrop onClick={handleBackdropClick} $zIndex={zIndex}>
            <S.Dialog
                id={id}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? `${id}-title` : undefined}
                aria-describedby={subTitle ? `${id}-subtitle` : undefined}
                $size={size}
                $animation={animation}
                onClick={handleDialogClick}
            >
                <PopupShell
                    closable={closable}
                    onClose={createCloseHandler(onClose, "button")}
                    {...(title != null ? { title: <span id={`${id}-title`}>{title}</span> } : {})}
                    {...(subTitle != null
                        ? { subTitle: <span id={`${id}-subtitle`}>{subTitle}</span> }
                        : {})}
                    {...(topSlot != null ? { topSlot } : {})}
                    {...(bottomSlot != null ? { bottomSlot } : {})}
                    {...(actions != null ? { actions } : {})}
                >
                    {children}
                </PopupShell>
            </S.Dialog>
        </S.Backdrop>,
        document.body,
    );
}
