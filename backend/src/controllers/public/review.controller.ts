import type { Request, Response } from "express";

import { ReviewService } from "@/services/review.service";
import { toReview, toReviews } from "@/mappers/review";
import {
    validateCreateReview,
    validateProductId,
    validateReviewId,
} from "@/validation/review.validation";

const service = new ReviewService();

export async function createReview(req: Request, res: Response) {
    const dto = validateCreateReview(req);

    const doc = await service.createReview({
        productId: dto.productId,
        userId: dto.userId,
        userName: dto.userName,
        rating: dto.rating,
        text: dto.text,
        photos: dto.photos,
    });

    res.status(201).json(toReview(doc));
}

export async function getProductReviews(req: Request, res: Response) {
    const productId = validateProductId(req);
    const docs = await service.getApprovedByProduct(productId);

    res.json(toReviews(docs));
}

export async function getAllProductReviews(req: Request, res: Response) {
    const productId = validateProductId(req);
    const docs = await service.getAllByProduct(productId);

    res.json(toReviews(docs));
}

export async function approveReview(req: Request, res: Response) {
    const id = validateReviewId(req);

    await service.approve(id);

    res.json({ ok: true });
}

export async function rejectReview(req: Request, res: Response) {
    const id = validateReviewId(req);

    await service.reject(id);

    res.json({ ok: true });
}

export async function deleteReview(req: Request, res: Response) {
    const id = validateReviewId(req);

    await service.delete(id);

    res.json({ ok: true });
}
