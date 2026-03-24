import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";

import { asyncHandler } from "@/lib/express";
import {
    addRecentlyViewed,
    getRecentlyViewed,
} from "@/controllers/user/recently-viewed.controller";

export const recentlyViewedRouter: Router = Router();

recentlyViewedRouter.use(requireAuth);

recentlyViewedRouter.get("/", asyncHandler(getRecentlyViewed));
recentlyViewedRouter.post("/:productId", asyncHandler(addRecentlyViewed));
