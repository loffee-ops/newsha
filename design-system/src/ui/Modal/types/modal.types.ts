import type { ReactNode } from "react";
import type { PopupShellAction } from "@ds/ui/PopupShell/types";

export type ModalId = string & { readonly __brand: "ModalId" };

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "fullscreen";
export type ModalAnimation = "fade" | "scale" | "slide-up" | "slide-right";
export type ModalCloseReason = "backdrop" | "escape" | "button" | "programmatic";

export type ModalProps = {
    id: ModalId;
    isOpen: boolean;
    title?: ReactNode;
    subTitle?: ReactNode;
    children?: ReactNode;
    topSlot?: ReactNode;
    bottomSlot?: ReactNode;
    actions?: PopupShellAction[];
    size?: ModalSize;
    animation?: ModalAnimation;
    closable?: boolean;
    backdropClosable?: boolean;
    scrollbarLock?: boolean;
    closeOnEscape?: boolean;
    zIndex?: number;
    onOpen?: () => void;
    onClose?: (reason: ModalCloseReason) => void;
};
