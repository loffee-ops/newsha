import mongoose from "mongoose";
import crypto from "node:crypto";

import type { UserRole } from "@shared/domain/user";

import { SessionModel } from "@/models/session.model";

import { issueAuthTokens } from "./auth.tokens";

const REFRESH_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

export function hashRefreshToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSessionWithTokens(input: {
    userId: string;
    role: UserRole;
    userAgent?: string;
    ip?: string;
}) {
    const now = Date.now();
    const sessionId = new mongoose.Types.ObjectId().toString();

    const { accessToken, refreshToken } = issueAuthTokens({
        userId: input.userId,
        role: input.role,
        sessionId,
    });

    const refreshTokenHash = hashRefreshToken(refreshToken);

    const session = await SessionModel.create({
        _id: sessionId,
        userId: input.userId,
        refreshTokenHash,
        expiresAt: new Date(now + REFRESH_SESSION_TTL_MS),
        revokedAt: null,
        replacedBySessionId: null,
        lastUsedAt: new Date(now),
        userAgent: input.userAgent ?? null,
        ip: input.ip ?? null,
    });

    return {
        session,
        accessToken,
        refreshToken,
    };
}
