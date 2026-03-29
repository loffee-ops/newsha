import type { QuantityControlProps } from "./types";
import * as S from "./QuantityControl.styled";

export function QuantityControl({
    value,
    valueRef,
    min = 1,
    max,
    onDecrease,
    onIncrease,
    className,
}: QuantityControlProps) {
    const canDecrease = value > min;
    const canIncrease = max === undefined || value < max;

    return (
        <S.Wrapper className={className}>
            <S.Control role="group" aria-label="Керування кількістю" data-slot="control">
                <S.DecrementButton
                    type="button"
                    onClick={onDecrease}
                    disabled={!canDecrease}
                    aria-label="Зменшити кількість"
                    data-slot="decrement"
                >
                    <S.Icon aria-hidden="true" data-slot="icon">
                        −
                    </S.Icon>
                </S.DecrementButton>

                <S.ValueBox ref={valueRef} aria-live="polite" aria-atomic="true" data-slot="value">
                    {value}
                </S.ValueBox>

                <S.IncrementButton
                    type="button"
                    onClick={onIncrease}
                    disabled={!canIncrease}
                    aria-label="Збільшити кількість"
                    data-slot="increment"
                >
                    <S.Icon aria-hidden="true" data-slot="icon">
                        +
                    </S.Icon>
                </S.IncrementButton>
            </S.Control>
        </S.Wrapper>
    );
}
