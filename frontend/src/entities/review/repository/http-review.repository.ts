import type { CreateReviewDTO } from "@shared/contracts/review/review.dto";
import type { Review } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

import { reviewApi } from "@/entities/review/api";

import type { ReviewRepository } from "./review.repository";

export class HttpReviewRepository implements ReviewRepository {
    async createReview(payload: CreateReviewDTO): Promise<Review> {
        return reviewApi.createReview(payload);
    }

    async getProductReviews(productId: ID): Promise<readonly Review[]> {
        return reviewApi.getProductReviews(productId);
    }

    async getAllProductReviews(productId: ID): Promise<readonly Review[]> {
        return reviewApi.getAllProductReviews(productId);
    }

    async approveReview(id: ID): Promise<void> {
        await reviewApi.approveReview(id);
    }

    async rejectReview(id: ID): Promise<void> {
        await reviewApi.rejectReview(id);
    }

    async deleteReview(id: ID): Promise<void> {
        await reviewApi.deleteReview(id);
    }
}
