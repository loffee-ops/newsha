import type { InputHTMLAttributes, ReactNode } from "react";

export type RadioSize = "sm" | "md" | "lg";
export type RadioVariant = "default" | "card" | "icon";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    icon?: ReactNode;
    radioSize?: RadioSize;
    variant?: RadioVariant;
    isInvalid?: boolean;
};
