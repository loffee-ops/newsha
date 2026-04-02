import type { ButtonHTMLAttributes, ReactNode } from "react";

export type GlassIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactNode;
    size?: number;
    children?: ReactNode;
};
