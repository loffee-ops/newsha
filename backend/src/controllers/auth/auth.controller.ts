import type { Request, Response } from "express";

import { AUTH_COOKIE_NAME, IS_PRODUCTION } from "@/config";
import { AuthErrors } from "@/errors";

import { setRefreshCookie, clearRefreshCookie, REFRESH_COOKIE_NAME } from "@/modules/auth";
import {
    login,
    register,
    refreshSession,
    logoutCurrentSession,
    logoutAllSessions,
} from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { validateRegister, validateLogin } from "@/validation/auth.validation";

export function setAuthCookie(res: Response, token: string) {
    res.cookie(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: IS_PRODUCTION,
        path: "/",
    });
}

function clearAuthCookie(res: Response) {
    res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: true,
        sameSite: "lax",
        secure: IS_PRODUCTION,
        path: "/",
    });
}

function extractRefreshToken(req: Request): string {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];

    if (typeof token !== "string" || token.trim().length === 0) {
        throw AuthErrors.refreshTokenRequired();
    }

    return token;
}

export async function registerHandler(req: Request, res: Response) {
    const dto = validateRegister(req);

    const result = await register(dto, {
        userAgent: req.get("user-agent") ?? undefined,
        ip: req.ip,
    });

    setAuthCookie(res, result.accessToken);
    setRefreshCookie(res, result.refreshToken);

    res.status(201).json({ user: result.user });
}

export async function loginHandler(req: Request, res: Response) {
    const dto = validateLogin(req);

    const result = await login(dto, {
        userAgent: req.get("user-agent") ?? undefined,
        ip: req.ip,
    });

    setAuthCookie(res, result.accessToken);
    setRefreshCookie(res, result.refreshToken);

    res.json({ user: result.user });
}

export async function refreshHandler(req: Request, res: Response) {
    const refreshToken = extractRefreshToken(req);

    const result = await refreshSession(refreshToken, {
        userAgent: req.get("user-agent") ?? undefined,
        ip: req.ip,
    });

    setAuthCookie(res, result.accessToken);
    setRefreshCookie(res, result.refreshToken);

    res.json({ user: result.user });
}

export async function logoutHandler(req: Request, res: Response) {
    if (req.sessionId) {
        await logoutCurrentSession(req.sessionId);
    }

    clearAuthCookie(res);
    clearRefreshCookie(res);

    res.json({ ok: true });
}

export async function logoutAllHandler(req: Request, res: Response) {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    await logoutAllSessions(req.userId);

    clearAuthCookie(res);
    clearRefreshCookie(res);

    res.json({ ok: true });
}

export async function sessionsHandler(req: Request, res: Response) {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    const sessions = await userService.getUserSessions(req.userId);

    res.json({ sessions });
}

export async function revokeSessionHandler(req: Request, res: Response) {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    const rawSessionId = req.params.sessionId;

    if (typeof rawSessionId !== "string") {
        throw AuthErrors.invalidRefreshToken("Invalid session id");
    }

    await userService.revokeSessionById(req.userId, rawSessionId);

    res.json({ ok: true });
}
