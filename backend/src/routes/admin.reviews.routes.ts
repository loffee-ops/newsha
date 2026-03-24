import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getAllReviewsAdmin,
    getReviewByIdAdmin,
    updateReviewStatusAdmin,
    deleteReviewAdmin,
} from "@/controllers/admin/admin.reviews.controller";

export const adminReviewsRouter: Router = Router();

adminReviewsRouter.use(requireAuth, requireAdmin);

adminReviewsRouter.get("/", asyncHandler(getAllReviewsAdmin));
adminReviewsRouter.get("/:id", asyncHandler(getReviewByIdAdmin));
adminReviewsRouter.patch("/:id/status", asyncHandler(updateReviewStatusAdmin));
adminReviewsRouter.delete("/:id", asyncHandler(deleteReviewAdmin));
