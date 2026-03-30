import { SessionModel } from "@/models";

const REFRESH_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

export async function createSession(input: {
    userId: string;
    refreshTokenHash: string;
    userAgent?: string;
    ip?: string;
}) {
    const now = Date.now();

    const session = await SessionModel.create({
        userId: input.userId,
        refreshTokenHash: input.refreshTokenHash,
        userAgent: input.userAgent ?? null,
        ip: input.ip ?? null,
        lastUsedAt: new Date(now),
        expiresAt: new Date(now + REFRESH_SESSION_TTL_MS),
        revokedAt: null,
        replacedBySessionId: null,
    });

    return session;
}
