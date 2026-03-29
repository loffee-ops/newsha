import type { HTMLAttributes, ReactNode } from "react";

export type LoaderSize = "sm" | "md" | "lg";
export type LoaderVariant = "spinner" | "dots";

export type LoaderProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    size?: LoaderSize;
    variant?: LoaderVariant;
    label?: ReactNode;
    fullScreen?: boolean;
};
