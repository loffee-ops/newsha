import type { Review, ReviewStatus } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

import type { AdminPaginatedReviewsDTO, AdminReviewsQuery } from "@/entities/review/types";
import { adminReviewsApi } from "@/entities/review/api";

import type { AdminReviewRepository } from "./admin-review.repository";

export class HttpAdminReviewRepository implements AdminReviewRepository {
    getAll(params?: AdminReviewsQuery): Promise<AdminPaginatedReviewsDTO> {
        return adminReviewsApi.getAll(params);
    }

    getById(id: ID): Promise<Review> {
        return adminReviewsApi.getById(id);
    }

    updateStatus(payload: { id: ID; status: ReviewStatus }): Promise<Review> {
        return adminReviewsApi.updateStatus(payload);
    }

    async remove(id: ID): Promise<void> {
        await adminReviewsApi.remove(id);
    }
}
