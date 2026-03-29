import type { SkeletonProps } from "./types";

import * as S from "./Skeleton.styled";

export function Skeleton(props: SkeletonProps) {
    return <S.SkeletonBlock aria-hidden="true" {...props} />;
}
