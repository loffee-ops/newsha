import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LikeButtonSize = "sm" | "md" | "lg";
export type LikeButtonVariant = "default" | "ghost";

export type LikeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    isLiked?: boolean;
    likesCount?: number;
    showCount?: boolean;
    isLoading?: boolean;
    size?: LikeButtonSize;
    variant?: LikeButtonVariant;
    icon?: ReactNode;
};
