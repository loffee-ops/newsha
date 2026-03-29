import { useEffect, useRef } from "react";

export function useEscapeClose(active: boolean, onClose: () => void) {
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!active) return;

        const handler = (event: KeyboardEvent) => {
            if (event.defaultPrevented) return;

            if (event.key === "Escape") {
                event.stopPropagation();
                onCloseRef.current();
            }
        };

        window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [active]);
}
