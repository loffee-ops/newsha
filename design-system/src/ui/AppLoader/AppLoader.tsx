import { Loader } from "../Loader";

import * as S from "./AppLoader.styled";

type AppLoaderProps = {
    fullscreen?: boolean;
    label?: string;
    words?: string[];
    className?: string;
};

export function AppLoader({
    fullscreen = false,
    label = "Завантажуємо",
    words,
    className,
}: AppLoaderProps) {
    return (
        <S.Wrapper $fullscreen={fullscreen} className={className}>
            <Loader label={label} {...(words ? { words } : {})} />
        </S.Wrapper>
    );
}
