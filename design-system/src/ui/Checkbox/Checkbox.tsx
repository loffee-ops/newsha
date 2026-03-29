import {
    StyledCheckbox,
    StyledCheckboxBox,
    StyledCheckboxInput,
    StyledCheckboxLabel,
    StyledCheckboxMark,
    StyledCheckboxText,
} from "./Checkbox.styled";
import type { CheckboxProps } from "./types";

export const Checkbox = ({
    label,
    checkboxSize = "md",
    isInvalid,
    id,
    ...props
}: CheckboxProps) => {
    return (
        <StyledCheckbox>
            <StyledCheckboxInput
                id={id}
                type="checkbox"
                $checkboxSize={checkboxSize}
                aria-invalid={isInvalid}
                {...props}
            />

            <StyledCheckboxLabel htmlFor={id}>
                <StyledCheckboxBox $checkboxSize={checkboxSize}>
                    <StyledCheckboxMark viewBox="0 0 12 9" aria-hidden="true">
                        <polyline points="1 5 4 8 11 1" />
                    </StyledCheckboxMark>
                </StyledCheckboxBox>

                {label ? <StyledCheckboxText>{label}</StyledCheckboxText> : null}
            </StyledCheckboxLabel>
        </StyledCheckbox>
    );
};
