import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireAdmin } from "@/middleware/admin.middleware";
import { upload } from "@/middleware/upload.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getAllBanners,
    uploadBanner,
    updateBanner,
    deleteBanner,
} from "@/controllers/admin/admin.banner.controller";

export const bannerAdminRouter: Router = Router();

bannerAdminRouter.get("/", requireAuth, requireAdmin, asyncHandler(getAllBanners));
bannerAdminRouter.post(
    "/",
    requireAuth,
    requireAdmin,
    upload.single("file"),
    asyncHandler(uploadBanner),
);
bannerAdminRouter.patch("/:id", requireAuth, requireAdmin, asyncHandler(updateBanner));
bannerAdminRouter.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteBanner));
