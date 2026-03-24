import { Router } from "express";

import { asyncHandler } from "@/lib/express";
import { getProductFilters } from "@/controllers/public/product-filters.controller";

export const productFiltersRouter: Router = Router();

productFiltersRouter.get("/", asyncHandler(getProductFilters));
