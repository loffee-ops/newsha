import type { ReviewRepository } from "@/entities/review/repository";
import { HttpReviewRepository } from "@/entities/review/repository";

export function createReviewService(): ReviewRepository {
    return new HttpReviewRepository();
}
