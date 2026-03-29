import { Router } from "express";

import { health } from "@/controllers/public/health.controller";
import { asyncHandler } from "@/lib/express";

export const healthRouter = Router();

healthRouter.get("/", asyncHandler(health));
