import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    createConsultation,
    getAllConsultations,
    updateConsultationStatus,
    deleteConsultation,
} from "@/controllers/public/consultation.controller";

export const consultationRouter: Router = Router();

consultationRouter.post("/", asyncHandler(createConsultation));

consultationRouter.get("/", requireAuth, requireAdmin, asyncHandler(getAllConsultations));
consultationRouter.patch(
    "/:id/status",
    requireAuth,
    requireAdmin,
    asyncHandler(updateConsultationStatus),
);
consultationRouter.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteConsultation));
