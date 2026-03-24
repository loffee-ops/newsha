import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";

import { asyncHandler } from "@/lib/express";
import { getCart, addToCart, removeFromCart, clearCart } from "@/controllers/user/cart.controller";

export const cartRouter: Router = Router();

cartRouter.use(requireAuth);

cartRouter.get("/", asyncHandler(getCart));
cartRouter.post("/items", asyncHandler(addToCart));
cartRouter.delete("/items", asyncHandler(removeFromCart));
cartRouter.delete("/", asyncHandler(clearCart));
