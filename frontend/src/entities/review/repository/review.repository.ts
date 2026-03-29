import type { CreateReviewDTO } from "@shared/contracts/review/review.dto";
import type { Review } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

export interface ReviewRepository {
    createReview(payload: CreateReviewDTO): Promise<Review>;
    getProductReviews(productId: ID): Promise<readonly Review[]>;
    getAllProductReviews(productId: ID): Promise<readonly Review[]>;
    approveReview(id: ID): Promise<void>;
    rejectReview(id: ID): Promise<void>;
    deleteReview(id: ID): Promise<void>;
}
