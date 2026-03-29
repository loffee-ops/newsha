import type { InputHTMLAttributes, ReactNode } from "react";

export type ToggleSwitchSize = "sm" | "md" | "lg";

export type ToggleSwitchLabelPosition = "left" | "right";

export type ToggleSwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    switchSize?: ToggleSwitchSize;
    labelPosition?: ToggleSwitchLabelPosition;
    isInvalid?: boolean;
};
