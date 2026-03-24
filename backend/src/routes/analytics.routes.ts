import { Router } from "express";

import { asyncHandler } from "@/lib/express";
import { trackEvent } from "@/controllers/public/analytics.controller";

export const analyticsRouter: Router = Router();

analyticsRouter.post("/", asyncHandler(trackEvent));
