import type { Request, Response } from "express";

import { ReviewService } from "@/services";

import { toReview, toReviews } from "@/mappers/review";

import { validateReviewId, validateReviewStatus } from "@/validation";

const service = new ReviewService();

export async function getAllReviewsAdmin(req: Request, res: Response) {
    const result = await service.getAdminList(req);

    res.json({
        ...result,
        items: toReviews(result.items),
    });
}

export async function getReviewByIdAdmin(req: Request, res: Response) {
    const id = validateReviewId(req);
    const doc = await service.getById(id);

    res.json(toReview(doc));
}

export async function updateReviewStatusAdmin(req: Request, res: Response) {
    const id = validateReviewId(req);
    const status = validateReviewStatus(req.body?.status);

    const doc = await service.updateStatus(id, status);

    res.json(toReview(doc));
}

export async function deleteReviewAdmin(req: Request, res: Response) {
    const id = validateReviewId(req);

    await service.delete(id);

    res.json({ ok: true });
}
