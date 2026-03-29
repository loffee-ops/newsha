import type { ToastType } from "../types";

export const TOAST_BG: Record<ToastType, string> = {
    success: "rgba(209, 250, 229, 0.88)",
    error: "rgba(254, 226, 226, 0.88)",
    warning: "rgba(255, 247, 219, 0.9)",
    info: "rgba(240, 249, 255, 0.88)",
};

export const TOAST_DOT: Record<ToastType, string> = {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
};
