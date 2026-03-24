import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    createReview,
    getProductReviews,
    getAllProductReviews,
    approveReview,
    rejectReview,
    deleteReview,
} from "@/controllers/public/review.controller";

export const reviewsRouter: Router = Router();

reviewsRouter.post("/", requireAuth, asyncHandler(createReview));
reviewsRouter.get("/product/:productId", asyncHandler(getProductReviews));
reviewsRouter.get(
    "/product/:productId/all",
    requireAuth,
    requireAdmin,
    asyncHandler(getAllProductReviews),
);
reviewsRouter.patch("/:id/approve", requireAuth, requireAdmin, asyncHandler(approveReview));
reviewsRouter.patch("/:id/reject", requireAuth, requireAdmin, asyncHandler(rejectReview));
reviewsRouter.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteReview));
