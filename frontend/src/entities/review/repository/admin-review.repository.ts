import type { Review, ReviewStatus } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

import type { AdminPaginatedReviewsDTO, AdminReviewsQuery } from "@/entities/review/types";

export interface AdminReviewRepository {
    getAll(params?: AdminReviewsQuery): Promise<AdminPaginatedReviewsDTO>;
    getById(id: ID): Promise<Review>;
    updateStatus(payload: { id: ID; status: ReviewStatus }): Promise<Review>;
    remove(id: ID): Promise<void>;
}
