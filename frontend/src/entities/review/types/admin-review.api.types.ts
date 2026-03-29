import type { PaginatedResponse, PaginationQueryDTO } from "@shared/contracts/pagination";
import type { Review, ReviewStatus } from "@shared/domain/review";
import type { ID } from "@shared/primitives";

export type AdminReviewsQuery = Pick<PaginationQueryDTO, "page" | "limit">;

export type AdminPaginatedReviewsDTO = PaginatedResponse<Review>;

export type UpdateAdminReviewStatusPayload = {
    id: ID;
    status: ReviewStatus;
};
