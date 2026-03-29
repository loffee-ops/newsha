import {
    StyledRadio,
    StyledRadioControl,
    StyledRadioInput,
    StyledRadioItem,
    StyledRadioLabel,
    StyledRadioText,
} from "./Radio.styled";
import type { RadioProps } from "./types";

export const Radio = ({
    label,
    icon,
    radioSize = "md",
    variant = "default",
    isInvalid,
    id,
    ...props
}: RadioProps) => {
    return (
        <StyledRadio>
            <StyledRadioItem $radioSize={radioSize} $variant={variant}>
                <StyledRadioInput id={id} type="radio" aria-invalid={isInvalid} {...props} />

                <StyledRadioLabel htmlFor={id} $radioSize={radioSize} $variant={variant}>
                    <StyledRadioControl $radioSize={radioSize} $variant={variant}>
                        {icon}
                    </StyledRadioControl>

                    {label ? <StyledRadioText>{label}</StyledRadioText> : null}
                </StyledRadioLabel>
            </StyledRadioItem>
        </StyledRadio>
    );
};
