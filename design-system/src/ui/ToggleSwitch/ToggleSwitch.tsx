import {
    StyledToggleContainer,
    StyledToggleInner,
    StyledToggleInput,
    StyledToggleLabel,
    StyledToggleSlider,
    StyledToggleText,
} from "./ToggleSwitch.styled";
import type { ToggleSwitchProps } from "./types";

export const ToggleSwitch = ({
    id,
    label,
    switchSize = "md",
    labelPosition = "right",
    isInvalid,
    ...props
}: ToggleSwitchProps) => {
    return (
        <StyledToggleContainer $labelPosition={labelPosition}>
            {label && labelPosition === "left" ? (
                <StyledToggleText>{label}</StyledToggleText>
            ) : null}

            <StyledToggleInner $switchSize={switchSize}>
                <StyledToggleInput id={id} type="checkbox" aria-invalid={isInvalid} {...props} />
                <StyledToggleLabel htmlFor={id}>
                    <StyledToggleSlider $switchSize={switchSize} />
                </StyledToggleLabel>
            </StyledToggleInner>

            {label && labelPosition === "right" ? (
                <StyledToggleText>{label}</StyledToggleText>
            ) : null}
        </StyledToggleContainer>
    );
};
