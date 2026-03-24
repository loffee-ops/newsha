import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";

import { asyncHandler } from "@/lib/express";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
} from "@/controllers/user/wishlist.controller";

export const wishlistRouter: Router = Router();

wishlistRouter.use(requireAuth);

wishlistRouter.get("/", asyncHandler(getWishlist));
wishlistRouter.post("/", asyncHandler(addToWishlist));
wishlistRouter.delete("/", asyncHandler(removeFromWishlist));
wishlistRouter.post("/toggle", asyncHandler(toggleWishlist));
