import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import type { ID } from "@shared/primitives";
import { REVIEW_STATUS, type ReviewStatus } from "@shared/domain/review";

import { ReviewModel, type ReviewDoc } from "@/models/review.model";
import { ProductRatingService } from "./product-rating.service";
import { paginate, type PaginatedResult } from "@/lib/db";
import { CommonErrors } from "@/errors";

const ratingService = new ProductRatingService();

function validateReviewObjectId(reviewId: ID | string) {
    if (!isValidObjectId(String(reviewId))) {
        throw CommonErrors.badRequest("Invalid review id");
    }
}

export class ReviewService {
    async createReview(data: {
        productId: ID;
        userId: ID;
        userName: string;
        rating: number;
        text?: string;
        photos?: string[];
    }): Promise<ReviewDoc> {
        const doc = await ReviewModel.create({
            productId: String(data.productId),
            userId: String(data.userId),
            userName: data.userName,
            rating: data.rating,
            text: data.text,
            photos: data.photos,
            status: REVIEW_STATUS.Pending,
        });

        return doc.toObject();
    }

    async getApprovedByProduct(productId: ID): Promise<ReviewDoc[]> {
        return ReviewModel.find({
            productId: String(productId),
            status: REVIEW_STATUS.Approved,
        })
            .sort({ createdAt: -1 })
            .lean<ReviewDoc[]>();
    }

    async getAllByProduct(productId: ID): Promise<ReviewDoc[]> {
        return ReviewModel.find({
            productId: String(productId),
        })
            .sort({ createdAt: -1 })
            .lean<ReviewDoc[]>();
    }

    async getAdminList(req: Request): Promise<PaginatedResult<ReviewDoc>> {
        const result = await paginate(ReviewModel, {}, req, {
            sort: { createdAt: -1 },
        });

        return {
            ...result,
            items: result.items as ReviewDoc[],
        };
    }

    async getById(reviewId: ID | string): Promise<ReviewDoc> {
        validateReviewObjectId(reviewId);

        const review = await ReviewModel.findById(String(reviewId)).lean<ReviewDoc | null>();

        if (!review) {
            throw CommonErrors.notFound("Review not found");
        }

        return review;
    }

    async updateStatus(reviewId: ID | string, status: ReviewStatus): Promise<ReviewDoc> {
        validateReviewObjectId(reviewId);

        const review = await ReviewModel.findByIdAndUpdate(
            String(reviewId),
            { $set: { status } },
            { new: true, runValidators: true },
        ).lean<ReviewDoc | null>();

        if (!review) {
            throw CommonErrors.notFound("Review not found");
        }

        await ratingService.recalc(review.productId as ID);

        return review;
    }

    async approve(reviewId: ID): Promise<ReviewDoc> {
        return this.updateStatus(reviewId, REVIEW_STATUS.Approved);
    }

    async reject(reviewId: ID): Promise<ReviewDoc> {
        return this.updateStatus(reviewId, REVIEW_STATUS.Rejected);
    }

    async delete(reviewId: ID | string): Promise<void> {
        validateReviewObjectId(reviewId);

        const review = await ReviewModel.findByIdAndDelete(
            String(reviewId),
        ).lean<ReviewDoc | null>();

        if (!review) {
            throw CommonErrors.notFound("Review not found");
        }

        await ratingService.recalc(review.productId as ID);
    }
}
