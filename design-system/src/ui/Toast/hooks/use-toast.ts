import { showToast } from "../model";
import type { ToastOptions, ToastType } from "../types";
import { TOAST_TYPES } from "../types";

export function useToast() {
    return {
        show: (type: ToastType, message: string, options?: ToastOptions) =>
            showToast(type, message, options),

        success: (message: string, options?: ToastOptions) =>
            showToast(TOAST_TYPES.SUCCESS, message, options),

        error: (message: string, options?: ToastOptions) =>
            showToast(TOAST_TYPES.ERROR, message, options),

        info: (message: string, options?: ToastOptions) =>
            showToast(TOAST_TYPES.INFO, message, options),

        warning: (message: string, options?: ToastOptions) =>
            showToast(TOAST_TYPES.WARNING, message, options),
    } as const;
}
