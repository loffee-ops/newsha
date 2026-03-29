import { useCallback, useEffect, useRef, useState } from "react";

import type { SliderOptions } from "../types";

export function useSlider({ itemsCount, gap = 0 }: SliderOptions) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const stepRef = useRef(0);

    const [active, setActive] = useState(0);

    const getActiveIndex = useCallback(() => {
        const el = trackRef.current;

        if (!el || stepRef.current === 0 || itemsCount <= 0) {
            return 0;
        }

        const index = Math.round(el.scrollLeft / stepRef.current);
        return Math.max(0, Math.min(index, itemsCount - 1));
    }, [itemsCount]);

    const measureStep = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;

        const first = el.firstElementChild as HTMLElement | null;
        const width = first?.getBoundingClientRect().width ?? el.clientWidth ?? 0;

        stepRef.current = width + gap;
    }, [gap]);

    const updateActive = useCallback(() => {
        setActive(getActiveIndex());
    }, [getActiveIndex]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        measureStep();

        el.addEventListener("scroll", updateActive, { passive: true });

        const handleResize = () => {
            measureStep();
            setActive(getActiveIndex());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            el.removeEventListener("scroll", updateActive);
            window.removeEventListener("resize", handleResize);
        };
    }, [getActiveIndex, measureStep, updateActive]);

    const scrollTo = useCallback(
        (index: number) => {
            const el = trackRef.current;
            if (!el || itemsCount <= 0 || stepRef.current === 0) return;

            const clamped = Math.max(0, Math.min(index, itemsCount - 1));

            el.scrollTo({
                left: clamped * stepRef.current,
                behavior: "smooth",
            });
        },
        [itemsCount],
    );

    return {
        trackRef,
        active,
        scrollTo,
        remeasure: measureStep,
    };
}
