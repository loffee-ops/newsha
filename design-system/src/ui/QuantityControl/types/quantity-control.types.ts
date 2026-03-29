import type { RefObject } from "react";

export type QuantityControlProps = {
    value: number;
    valueRef?: RefObject<HTMLSpanElement | null>;
    min?: number;
    max?: number;
    onDecrease: () => void;
    onIncrease: () => void;
    className?: string;
};
