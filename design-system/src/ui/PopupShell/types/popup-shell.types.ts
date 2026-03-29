import type { ReactNode } from "react";

export type PopupShellActionVariant = "primary" | "secondary" | "danger" | "ghost";

export type PopupShellAction = {
    label: string;
    onClick: () => void;
    variant?: PopupShellActionVariant;
};

export type PopupShellProps = {
    title?: ReactNode;
    subTitle?: ReactNode;
    topSlot?: ReactNode;
    bottomSlot?: ReactNode;
    actions?: PopupShellAction[];
    closable?: boolean;
    onClose?: () => void;
    children?: ReactNode;
    className?: string;
};
