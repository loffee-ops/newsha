import { useEffect } from "react";

type UseEscapeKeyParams = {
    enabled: boolean;
    onEscape?: () => void;
};

export function useEscapeKey({ enabled, onEscape }: UseEscapeKeyParams) {
    useEffect(() => {
        if (!enabled) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onEscape?.();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [enabled, onEscape]);
}
