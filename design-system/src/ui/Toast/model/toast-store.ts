import type { Toast, ToastOptions, ToastPromiseMessages, ToastType } from "../types";
import { TOAST_TYPES } from "../types";

type Listener = (toasts: Toast[]) => void;
type ToastPatch = Partial<Omit<Toast, "id">>;

const DEFAULT_DURATION = 2200;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();

function createId(): string {
    return Math.random().toString(36).slice(2);
}

function notify(): void {
    listeners.forEach((listener) => listener(toasts));
}

export function removeToast(id: string): void {
    toasts = toasts.filter((toast) => toast.id !== id);
    notify();
}

function autoRemove(toast: Toast): void {
    if (toast.persistent) return;

    const duration = toast.duration ?? DEFAULT_DURATION;
    if (duration <= 0) return;

    setTimeout(() => {
        removeToast(toast.id);
    }, duration);
}

function replaceToast(id: string, patch: ToastPatch): void {
    toasts = toasts.map((toast) => (toast.id === id ? { ...toast, ...patch } : toast));
    notify();
}

function createToast(type: ToastType, message: string, options?: ToastOptions): Toast {
    return {
        id: options?.id ?? createId(),
        type,
        message,
        ...(options?.title ? { title: options.title } : {}),
        ...(options?.duration !== undefined ? { duration: options.duration } : {}),
        ...(options?.position ? { position: options.position } : {}),
        ...(options?.animation ? { animation: options.animation } : {}),
        ...(options?.closable !== undefined ? { closable: options.closable } : {}),
        ...(options?.persistent !== undefined ? { persistent: options.persistent } : {}),
    };
}

export function showToast(type: ToastType, message: string, options?: ToastOptions): string {
    const toast = createToast(type, message, options);

    toasts = [...toasts, toast];
    notify();
    autoRemove(toast);

    return toast.id;
}

export function showPromiseToast<T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: ToastOptions,
): string {
    const id = options?.id ?? createId();

    const loadingToast = createToast(TOAST_TYPES.INFO, messages.loading, {
        ...options,
        id,
        persistent: true,
    });

    toasts = [...toasts, loadingToast];
    notify();

    promise
        .then((result) => {
            const successToast: ToastPatch = {
                type: TOAST_TYPES.SUCCESS,
                message:
                    typeof messages.success === "function"
                        ? messages.success(result)
                        : messages.success,
                persistent: false,
                ...(options?.duration !== undefined ? { duration: options.duration } : {}),
            };

            replaceToast(id, successToast);
            autoRemove({
                ...loadingToast,
                ...successToast,
            });
        })
        .catch((error: unknown) => {
            const errorToast: ToastPatch = {
                type: TOAST_TYPES.ERROR,
                message:
                    typeof messages.error === "function" ? messages.error(error) : messages.error,
                persistent: false,
                ...(options?.duration !== undefined ? { duration: options.duration } : {}),
            };

            replaceToast(id, errorToast);
            autoRemove({
                ...loadingToast,
                ...errorToast,
            });
        });

    return id;
}

export function subscribeToToasts(listener: Listener): () => void {
    listeners.add(listener);
    listener(toasts);

    return () => {
        listeners.delete(listener);
    };
}
