import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    createCooperation,
    getAllCooperations,
    updateCooperationStatus,
    deleteCooperation,
} from "@/controllers/public/cooperation.controller";

export const cooperationRouter: Router = Router();

cooperationRouter.post("/", asyncHandler(createCooperation));

cooperationRouter.get("/", requireAuth, requireAdmin, asyncHandler(getAllCooperations));
cooperationRouter.patch(
    "/:id/status",
    requireAuth,
    requireAdmin,
    asyncHandler(updateCooperationStatus),
);
cooperationRouter.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteCooperation));
