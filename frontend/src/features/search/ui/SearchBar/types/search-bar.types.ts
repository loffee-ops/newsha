import type { FocusEventHandler, InputHTMLAttributes } from "react";

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur"> & {
    value: string;
    onChange: (value: string) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    className?: string;
};
