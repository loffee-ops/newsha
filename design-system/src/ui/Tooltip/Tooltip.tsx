import { StyledTooltip, StyledTooltipContent, StyledTooltipTrigger } from "./Tooltip.styled";
import type { TooltipProps } from "./types";

export const Tooltip = ({
    content,
    children,
    placement = "top",
    hasArrow = true,
    disabled = false,
    ...props
}: TooltipProps) => {
    return (
        <StyledTooltip {...props}>
            <StyledTooltipTrigger>{children}</StyledTooltipTrigger>

            {!disabled ? (
                <StyledTooltipContent $placement={placement} $hasArrow={hasArrow}>
                    {content}
                </StyledTooltipContent>
            ) : null}
        </StyledTooltip>
    );
};
