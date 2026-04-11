import React from "react";
import { Pill } from "./GlassPill.styled";

import type { GlassPillProps } from "./types";

export const GlassPill: React.FC<GlassPillProps> = ({
    children,
    className,
    style,
    padding,
    minHeight,
    radius,
    background,
    border,
    shadow,
    blur,
    width,
    display,
    justify,
}) => {
    return (
        <Pill
            className={className}
            style={style}
            {...(padding !== undefined ? { $padding: padding } : {})}
            {...(minHeight !== undefined ? { $minHeight: minHeight } : {})}
            {...(radius !== undefined ? { $radius: radius } : {})}
            {...(background !== undefined ? { $background: background } : {})}
            {...(border !== undefined ? { $border: border } : {})}
            {...(shadow !== undefined ? { $shadow: shadow } : {})}
            {...(blur !== undefined ? { $blur: blur } : {})}
            {...(width !== undefined ? { $width: width } : {})}
            {...(display !== undefined ? { $display: display } : {})}
            {...(justify !== undefined ? { $justify: justify } : {})}
        >
            {children}
        </Pill>
    );
};

export default GlassPill;
