import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";

import { asyncHandler } from "@/lib/express";
import { checkout, getMyOrders } from "@/controllers/user/order.controller";

export const orderRouter: Router = Router();

orderRouter.post("/checkout", requireAuth, asyncHandler(checkout));
orderRouter.get("/", requireAuth, asyncHandler(getMyOrders));
