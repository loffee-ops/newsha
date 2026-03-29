import { StyledButton, ButtonText, ButtonIconContainer } from "./Button.styled";
import type { ButtonProps } from "./types";

export function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    isActive = false,
    loadingText = "Loading...",
    disabled,
    type = "button",
    ...props
}: ButtonProps) {
    const isDisabled = disabled || isLoading;

    return (
        <StyledButton
            type={type}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            isActive={isActive}
            disabled={isDisabled}
            {...props}
        >
            {leftIcon ? (
                <ButtonIconContainer $position="left">{leftIcon}</ButtonIconContainer>
            ) : null}

            <ButtonText>{isLoading ? loadingText : children}</ButtonText>

            {rightIcon ? (
                <ButtonIconContainer $position="right">{rightIcon}</ButtonIconContainer>
            ) : null}
        </StyledButton>
    );
}
