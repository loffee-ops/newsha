import type { ID } from "@shared/primitives";
import type { ReviewRating, ReviewStats } from "@shared/domain/review";
import { REVIEW_STATUS } from "@shared/domain/review";

import { ReviewModel } from "@/models/review.model";

type AggRow = {
    _id: number;
    count: number;
    sum: number;
};

const EMPTY_STARS = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
} satisfies Record<ReviewRating, number>;

export class ReviewStatsService {
    async getApprovedByProduct(productId: ID): Promise<ReviewStats> {
        const rows = await ReviewModel.aggregate<AggRow>([
            {
                $match: {
                    productId: String(productId),
                    status: REVIEW_STATUS.Approved,
                },
            },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 },
                    sum: { $sum: "$rating" },
                },
            },
        ]);

        const stars: Record<ReviewRating, number> = { ...EMPTY_STARS };

        let count = 0;
        let sum = 0;

        for (const row of rows) {
            if (row._id >= 1 && row._id <= 5) {
                const rating = row._id as ReviewRating;

                stars[rating] = row.count;
                count += row.count;
                sum += row.sum;
            }
        }

        const average = count > 0 ? Number((sum / count).toFixed(2)) : 0;

        return {
            average,
            count,
            stars,
        };
    }
}
