import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store";

import { closeAuthModal, openLoginModal, openRegisterModal } from "@/features/auth/model";

export function useAuthModal() {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.authUI.modalMode);
    const isOpen = mode !== null;

    const close = useCallback(() => {
        dispatch(closeAuthModal());
    }, [dispatch]);

    const switchToLogin = useCallback(() => {
        dispatch(openLoginModal());
    }, [dispatch]);

    const switchToRegister = useCallback(() => {
        dispatch(openRegisterModal());
    }, [dispatch]);

    useEffect(() => {
        if (!isOpen) return;

        const handler = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [isOpen, close]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return {
        mode,
        isOpen,
        close,
        switchToLogin,
        switchToRegister,
    };
}
