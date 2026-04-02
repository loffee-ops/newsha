import { GlassIconButtonRoot, GlassIconButtonContent } from "./GlassIconButton.styled";
import type { GlassIconButtonProps } from "./types";

export function GlassIconButton({
    icon,
    size = 50,
    type = "button",
    children,
    ...props
}: GlassIconButtonProps) {
    return (
        <GlassIconButtonRoot type={type} $size={size} {...props}>
            <GlassIconButtonContent>{icon}</GlassIconButtonContent>
            {children}
        </GlassIconButtonRoot>
    );
}
