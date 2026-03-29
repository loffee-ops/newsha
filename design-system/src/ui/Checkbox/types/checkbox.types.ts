import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    checkboxSize?: CheckboxSize;
    isInvalid?: boolean;
};
