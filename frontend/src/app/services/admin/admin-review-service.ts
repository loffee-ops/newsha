import type { AdminReviewRepository } from "@/entities/review/repository/admin-review.repository";
import { HttpAdminReviewRepository } from "@/entities/review/repository/http-admin-review.repository";

export function createAdminReviewService(): AdminReviewRepository {
    return new HttpAdminReviewRepository();
}
