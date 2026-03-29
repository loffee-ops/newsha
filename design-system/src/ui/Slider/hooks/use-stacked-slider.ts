import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import type { SliderOptions } from "../types";

export function useStackedSlider({
    itemsCount,
    visibleOffset = 80,
    scaleStep = 0.08,
    visibleRange = 1,
}: SliderOptions) {
    const [active, setActive] = useState(0);

    const next = useCallback(() => {
        if (itemsCount <= 0) return;
        setActive((index) => (index + 1) % itemsCount);
    }, [itemsCount]);

    const prev = useCallback(() => {
        if (itemsCount <= 0) return;
        setActive((index) => (index - 1 + itemsCount) % itemsCount);
    }, [itemsCount]);

    const getStyle = useCallback(
        (index: number): CSSProperties => {
            if (itemsCount <= 0) {
                return {
                    opacity: 0,
                    pointerEvents: "none",
                };
            }

            let diff = index - active;

            if (diff > itemsCount / 2) diff -= itemsCount;
            if (diff < -itemsCount / 2) diff += itemsCount;

            const abs = Math.abs(diff);

            if (abs > visibleRange) {
                return {
                    opacity: 0,
                    pointerEvents: "none",
                };
            }

            const translateX = diff * visibleOffset;
            const scale = 1 - abs * scaleStep;
            const zIndex = 10 - abs;

            return {
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity: 1,
            };
        },
        [active, itemsCount, visibleOffset, scaleStep, visibleRange],
    );

    return {
        active,
        next,
        prev,
        setActive,
        getStyle,
    };
}
