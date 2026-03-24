import { Router } from "express";

import { asyncHandler } from "@/lib/express";
import { getCategories, getCategoryBySlug } from "@/controllers/public/categories.controller";

export const categoriesRouter: Router = Router();

categoriesRouter.get("/", asyncHandler(getCategories));
categoriesRouter.get("/slug/:slug", asyncHandler(getCategoryBySlug));
