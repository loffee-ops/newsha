import type { HTMLAttributes, ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipTrigger = "hover" | "click";

export type TooltipProps = Omit<HTMLAttributes<HTMLDivElement>, "content"> & {
    content: ReactNode;
    children: ReactNode;
    placement?: TooltipPlacement;
    trigger?: TooltipTrigger;
    isOpen?: boolean;
    defaultOpen?: boolean;
    hasArrow?: boolean;
    disabled?: boolean;
};
