import { Router } from "express";

import { asyncHandler } from "@/lib/express";
import { getBanners } from "@/controllers/public/banner.controller";

export const bannersRouter: Router = Router();

bannersRouter.get("/", asyncHandler(getBanners));
