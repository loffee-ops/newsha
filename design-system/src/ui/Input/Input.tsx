import type { FC } from "react";
import { StyledInput, StyledInputField, StyledInputWrapper } from "./Input.styled";
import type { InputProps } from "./types";

export const Input: FC<InputProps> = ({
    label,
    hint,
    error,
    className,
    type = "text",
    isInvalid,
    ...props
}) => {
    return (
        <StyledInputWrapper>
            {label ? <label>{label}</label> : null}

            <StyledInput className={className}>
                <StyledInputField
                    type={type}
                    aria-invalid={isInvalid || Boolean(error)}
                    {...props}
                />
            </StyledInput>

            {error ? <div>{error}</div> : null}
            {!error && hint ? <div>{hint}</div> : null}
        </StyledInputWrapper>
    );
};
