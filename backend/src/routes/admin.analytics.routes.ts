import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import { getAnalytics, getAnalyticsStats } from "@/controllers/public/analytics.controller";

export const analyticsAdminRouter: Router = Router();

analyticsAdminRouter.use(requireAuth, requireAdmin);

analyticsAdminRouter.get("/", asyncHandler(getAnalytics));
analyticsAdminRouter.get("/stats", asyncHandler(getAnalyticsStats));
