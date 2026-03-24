import mongoose from "mongoose";

import { REVIEW_STATUS } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

import { ProductModel } from "@/models/product.model";
import { ReviewModel } from "@/models/review.model";

export class ProductRatingService {
    async recalc(productId: ID): Promise<void> {
        const pid = String(productId);

        const rows = await ReviewModel.aggregate<{
            avg: number;
            count: number;
        }>([
            {
                $match: {
                    productId: pid,
                    status: REVIEW_STATUS.Approved,
                },
            },
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$rating" },
                    count: { $sum: 1 },
                },
            },
        ]);

        const stats = rows[0];

        await ProductModel.updateOne(
            { _id: new mongoose.Types.ObjectId(pid) },
            {
                $set: {
                    ratingAvg: stats?.avg ?? 0,
                    ratingCount: stats?.count ?? 0,
                },
            },
        );
    }
}
