import type { Review, ReviewStats, ReviewRating } from "@shared/domain/review";

const EMPTY_STATS: ReviewStats = {
    average: 0,
    count: 0,
    stars: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    } satisfies Record<ReviewRating, number>,
};

export function calcReviewStats(reviews: readonly Review[]): ReviewStats {
    const approved = reviews.filter((r) => r.status === "approved");

    if (approved.length === 0) {
        return {
            average: 0,
            count: 0,
            stars: { ...EMPTY_STATS.stars },
        };
    }

    let sum = 0;
    const stars = { ...EMPTY_STATS.stars };

    for (const { rating } of approved) {
        sum += rating;
        stars[rating] += 1;
    }

    return {
        average: Number((sum / approved.length).toFixed(2)),
        count: approved.length,
        stars,
    };
}
