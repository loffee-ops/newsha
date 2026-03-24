import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getAllCategoriesAdmin,
    getCategoryByIdAdmin,
    createCategoryAdmin,
    updateCategoryAdmin,
    deleteCategoryAdmin,
    setCategoryActive,
} from "@/controllers/admin/admin.categories.controller";

export const adminCategoriesRouter: Router = Router();

adminCategoriesRouter.use(requireAuth, requireAdmin);

adminCategoriesRouter.get("/", asyncHandler(getAllCategoriesAdmin));
adminCategoriesRouter.get("/:id", asyncHandler(getCategoryByIdAdmin));
adminCategoriesRouter.post("/", asyncHandler(createCategoryAdmin));
adminCategoriesRouter.patch("/:id", asyncHandler(updateCategoryAdmin));
adminCategoriesRouter.delete("/:id", asyncHandler(deleteCategoryAdmin));
adminCategoriesRouter.patch("/:id/active", asyncHandler(setCategoryActive));
