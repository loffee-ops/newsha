import type { SegmentedControlProps } from "./types";
import * as S from "./SegmentedControl.styled";

export function SegmentedControl({
    name,
    value,
    options,
    onChange,
    className,
}: SegmentedControlProps) {
    return (
        <S.Root className={className} role="radiogroup" aria-label={name}>
            {options.map((option) => {
                const id = `${name}-${option.value}`;
                const checked = value === option.value;

                return (
                    <S.OptionLabel key={option.value} htmlFor={id}>
                        <S.HiddenInput
                            id={id}
                            type="radio"
                            name={name}
                            checked={checked}
                            disabled={option.disabled}
                            onChange={() => onChange(option.value)}
                        />
                        <S.Item>{option.label}</S.Item>
                    </S.OptionLabel>
                );
            })}
        </S.Root>
    );
}
