import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import { AUTH_COOKIE_NAME, JWT_SECRET } from "@/config";
import { AuthErrors } from "@/errors";
import { USER_ROLES, type UserRole } from "@shared/domain/user";

export type AuthTokenPayload = {
    userId: string;
    role: UserRole;
    sessionId: string;
};

function extractToken(req: Request): string | null {
    const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];

    if (typeof cookieToken === "string" && cookieToken.trim().length > 0) {
        return cookieToken;
    }

    const authorization = req.headers.authorization;

    if (typeof authorization === "string" && authorization.startsWith("Bearer ")) {
        return authorization.slice(7);
    }

    return null;
}

function isUserRole(value: unknown): value is UserRole {
    return value === USER_ROLES.USER || value === USER_ROLES.ADMIN || value === USER_ROLES.GUEST;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isAuthTokenPayload(value: unknown): value is AuthTokenPayload {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.userId === "string" &&
        typeof value.sessionId === "string" &&
        isUserRole(value.role)
    );
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
    try {
        const token = extractToken(req);

        if (!token) {
            next(AuthErrors.unauthorized());
            return;
        }

        const payload = jwt.verify(token, JWT_SECRET);

        if (!isAuthTokenPayload(payload)) {
            next(AuthErrors.unauthorized());
            return;
        }

        req.userId = payload.userId;
        req.userRole = payload.role;
        req.sessionId = payload.sessionId;

        next();
    } catch {
        next(AuthErrors.unauthorized());
    }
}
