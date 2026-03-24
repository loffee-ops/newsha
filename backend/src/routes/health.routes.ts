import { Router } from "express";

import { asyncHandler } from "@/lib/express";
import { health } from "@/controllers/public/health.controller";

export const healthRouter: Router = Router();

healthRouter.get("/", asyncHandler(health));
