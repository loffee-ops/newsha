import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
} from "@/controllers/admin/admin.users.controller";

export const adminUsersRouter: Router = Router();

adminUsersRouter.use(requireAuth, requireAdmin);

adminUsersRouter.get("/", asyncHandler(getAllUsers));
adminUsersRouter.get("/:id", asyncHandler(getUserById));
adminUsersRouter.patch("/:id/role", asyncHandler(updateUserRole));
adminUsersRouter.delete("/:id", asyncHandler(deleteUser));
