export type SliderDotOptions = {
    activeWidth?: string;
    inactiveWidth?: string;
    height?: string;
    activeColor?: string;
    inactiveColor?: string;
};

export type SliderOptions = {
    itemsCount: number;
    visibleOffset?: number;
    scaleStep?: number;
    visibleRange?: number;
    speed?: number;
    pauseOnInteraction?: boolean;
    gap?: number;
};
