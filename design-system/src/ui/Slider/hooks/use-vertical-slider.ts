import { useEffect, useRef } from "react";

type Options = {
    speed?: number;
    pauseOnInteraction?: boolean;
};

export function useVerticalSlider<T extends HTMLElement>({
    speed = 0.35,
    pauseOnInteraction = true,
}: Options = {}) {
    const ref = useRef<T | null>(null);
    const pausedRef = useRef(false);
    const yRef = useRef(0);
    const halfRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const measure = () => {
            halfRef.current = el.scrollHeight / 2;
        };

        const animate = () => {
            if (!pausedRef.current) {
                yRef.current += speed;

                if (yRef.current >= halfRef.current && halfRef.current > 0) {
                    yRef.current = 0;
                }

                el.style.transform = `translate3d(0, -${yRef.current}px, 0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        const onPause = () => {
            pausedRef.current = true;
        };

        const onResume = () => {
            pausedRef.current = false;
        };

        measure();

        const resizeObserver =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(() => {
                      measure();
                  })
                : null;

        resizeObserver?.observe(el);
        window.addEventListener("resize", measure);

        if (pauseOnInteraction) {
            el.addEventListener("mouseenter", onPause);
            el.addEventListener("mouseleave", onResume);
            el.addEventListener("touchstart", onPause, { passive: true });
            el.addEventListener("touchend", onResume);
            el.addEventListener("touchcancel", onResume);
            el.addEventListener("pointerdown", onPause);
            el.addEventListener("pointerup", onResume);
            el.addEventListener("pointercancel", onResume);
        }

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }

            resizeObserver?.disconnect();
            window.removeEventListener("resize", measure);

            if (pauseOnInteraction) {
                el.removeEventListener("mouseenter", onPause);
                el.removeEventListener("mouseleave", onResume);
                el.removeEventListener("touchstart", onPause);
                el.removeEventListener("touchend", onResume);
                el.removeEventListener("touchcancel", onResume);
                el.removeEventListener("pointerdown", onPause);
                el.removeEventListener("pointerup", onResume);
                el.removeEventListener("pointercancel", onResume);
            }

            el.style.transform = "";
        };
    }, [speed, pauseOnInteraction]);

    return ref;
}
