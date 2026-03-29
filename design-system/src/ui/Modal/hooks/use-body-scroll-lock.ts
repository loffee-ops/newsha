import { useEffect } from "react";

type UseBodyScrollLockParams = {
    enabled: boolean;
};

export function useBodyScrollLock({ enabled }: UseBodyScrollLockParams) {
    useEffect(() => {
        if (!enabled) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [enabled]);
}
