import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
} from "@/controllers/admin/admin.order.controller";

export const orderAdminRouter: Router = Router();

orderAdminRouter.get("/", requireAuth, requireAdmin, asyncHandler(getAllOrders));
orderAdminRouter.get("/:id", requireAuth, requireAdmin, asyncHandler(getOrderById));
orderAdminRouter.patch("/:id/status", requireAuth, requireAdmin, asyncHandler(updateOrderStatus));
