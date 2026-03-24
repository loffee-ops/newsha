import type { Response } from "express";

import { IS_PRODUCTION } from "@/config";

const REFRESH_COOKIE_NAME = "refresh_token";
const REFRESH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export function setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/api/auth",
        maxAge: REFRESH_COOKIE_MAX_AGE,
    });
}

export function clearRefreshCookie(res: Response) {
    res.clearCookie(REFRESH_COOKIE_NAME, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: "lax",
        path: "/api/auth",
    });
}

export { REFRESH_COOKIE_NAME };
