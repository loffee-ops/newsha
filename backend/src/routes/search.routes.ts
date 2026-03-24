import { Router } from "express";

import { asyncHandler } from "@/lib/express";
import { search } from "@/controllers/public/search.controller";

export const searchRouter: Router = Router();

searchRouter.get("/", asyncHandler(search));
