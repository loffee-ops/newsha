import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getAllProductsAdmin,
    getProductByIdAdmin,
    createProductAdmin,
    updateProductAdmin,
    deleteProductAdmin,
    setProductActive,
    setProductFlags,
} from "@/controllers/admin/admin.products.controller";

export const adminProductsRouter: Router = Router();

adminProductsRouter.use(requireAuth, requireAdmin);

adminProductsRouter.get("/", asyncHandler(getAllProductsAdmin));
adminProductsRouter.get("/:id", asyncHandler(getProductByIdAdmin));
adminProductsRouter.post("/", asyncHandler(createProductAdmin));
adminProductsRouter.patch("/:id", asyncHandler(updateProductAdmin));
adminProductsRouter.delete("/:id", asyncHandler(deleteProductAdmin));
adminProductsRouter.patch("/:id/active", asyncHandler(setProductActive));
adminProductsRouter.patch("/:id/flags", asyncHandler(setProductFlags));
