import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getProducts,
    getAllProducts,
    getProductById,
    getProductBySlug,
    searchProducts,
    createProduct,
} from "@/controllers/public/products.controller";
import { getProductFilters } from "@/controllers/public/product-filters.controller";

export const productsRouter: Router = Router();

productsRouter.get("/", asyncHandler(getProducts));
productsRouter.get("/all", asyncHandler(getAllProducts));
productsRouter.get("/search", asyncHandler(searchProducts));
productsRouter.get("/filters", asyncHandler(getProductFilters));
productsRouter.get("/slug/:slug", asyncHandler(getProductBySlug));
productsRouter.get("/:id", asyncHandler(getProductById));
productsRouter.post("/", requireAuth, requireAdmin, asyncHandler(createProduct));
