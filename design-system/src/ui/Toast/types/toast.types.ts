export const TOAST_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
} as const;

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export type ToastAnimation = "fade" | "slide-up" | "slide-down" | "scale";

export type Toast = {
    id: string;
    type: ToastType;
    message: string;
    title?: string;
    duration?: number;
    position?: ToastPosition;
    animation?: ToastAnimation;
    closable?: boolean;
    persistent?: boolean;
};

export type ToastOptions = Omit<Toast, "id" | "type" | "message"> & {
    id?: string;
};

export type ToastPromiseMessages<T = unknown> = {
    loading: string;
    success: string | ((result: T) => string);
    error: string | ((error: unknown) => string);
};
