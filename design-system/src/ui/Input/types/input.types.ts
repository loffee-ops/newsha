import type { InputHTMLAttributes, ReactNode } from "react";

export type InputVariant = "default" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: InputVariant;
    inputSize?: InputSize;
    fullWidth?: boolean;
    isInvalid?: boolean;
    isLoading?: boolean;
};
