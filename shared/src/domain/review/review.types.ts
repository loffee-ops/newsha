import type { ID, ISODate } from "@shared/primitives";

export const REVIEW_STATUS = {
    Pending: "pending",
    Approved: "approved",
    Rejected: "rejected",
} as const;

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export type ReviewStats = {
    average: number;
    count: number;
    stars: Record<ReviewRating, number>;
};

export type Review = {
    id: ID;
    productId: ID;
    userId: ID;
    userName: string;
    rating: ReviewRating;
    text?: string;
    photos?: readonly string[];
    status: ReviewStatus;
    createdAt: ISODate;
    updatedAt: ISODate;
};
