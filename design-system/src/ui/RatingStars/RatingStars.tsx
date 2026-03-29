import type { RatingStarsProps } from "./types";
import * as S from "./RatingStars.styled";

export function RatingStars({
    rating = 0,
    reviewCount = 0,
    max = 5,
    showValue = true,
    showCount = true,
}: RatingStarsProps) {
    const safeMax = Math.max(max, 1);
    const safeRating = Math.min(Math.max(rating, 0), safeMax);

    const ariaLabel =
        reviewCount > 0
            ? `Rating ${safeRating} of ${safeMax}, based on ${reviewCount} reviews`
            : `Rating ${safeRating} of ${safeMax}`;

    const displayRating = Number.isInteger(safeRating) ? String(safeRating) : safeRating.toFixed(1);

    return (
        <S.RatingWrapper aria-label={ariaLabel}>
            <S.Stars aria-hidden="true">
                {Array.from({ length: safeMax }).map((_, i) => {
                    const fillPercent = Math.min(Math.max(safeRating - i, 0), 1) * 100;

                    return (
                        <S.Star key={i}>
                            <span className="empty">☆</span>
                            {fillPercent > 0 && (
                                <S.Fill style={{ width: `${fillPercent}%` }}>★</S.Fill>
                            )}
                        </S.Star>
                    );
                })}
            </S.Stars>

            {showValue && safeRating > 0 && <S.RatingValue>{displayRating}</S.RatingValue>}

            {showCount && reviewCount > 0 && <S.RatingCount>({reviewCount})</S.RatingCount>}
        </S.RatingWrapper>
    );
}
