import { Router } from "express";

import { requireAuth } from "@/middleware/auth.middleware";

import { asyncHandler } from "@/lib/express";
import {
    registerHandler,
    loginHandler,
    refreshHandler,
    sessionsHandler,
    logoutHandler,
    logoutAllHandler,
    revokeSessionHandler,
} from "@/controllers/auth/auth.controller";
import { googleLoginHandler } from "@/controllers/auth/google.auth.controller";
import { authRateLimit, refreshRateLimit } from "@/middleware";

export const authRouter: Router = Router();

authRouter.post("/google", asyncHandler(googleLoginHandler));
authRouter.post("/register", authRateLimit, asyncHandler(registerHandler));
authRouter.post("/login", authRateLimit, asyncHandler(loginHandler));
authRouter.post("/refresh", refreshRateLimit, asyncHandler(refreshHandler));

authRouter.get("/sessions", requireAuth, asyncHandler(sessionsHandler));
authRouter.post("/sessions/:sessionId/revoke", requireAuth, asyncHandler(revokeSessionHandler));

authRouter.post("/logout", requireAuth, asyncHandler(logoutHandler));
authRouter.post("/logout-all", requireAuth, asyncHandler(logoutAllHandler));
