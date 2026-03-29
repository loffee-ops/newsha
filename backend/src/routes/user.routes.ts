import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";
import { asyncHandler } from "@/lib/express";
import {
    getMeHandler,
    updateMeHandler,
    changePasswordHandler,
} from "@/controllers/user/user.controller";

export const userRouter: Router = Router();

userRouter.use(requireAuth);

userRouter.get("/me", asyncHandler(getMeHandler));
userRouter.patch("/me", asyncHandler(updateMeHandler));
userRouter.patch("/me/password", asyncHandler(changePasswordHandler));
