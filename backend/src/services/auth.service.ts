import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

import type { LoginDTO, RegisterDTO } from "@shared/contracts/auth";
import type { User } from "@shared/domain/user";
import { USER_ROLES, type UserRole } from "@shared/domain/user";
import { asID } from "@shared/primitives";

import { JWT_SECRET } from "@/config";

import { AuthErrors, UserErrors } from "@/errors";

import { UserModel } from "@/models/user.model";
import { SessionModel } from "@/models/session.model";
import type { UserDoc } from "@/models/user.model";

import { createSession, issueAuthTokens } from "@/modules/auth";
import type { RefreshTokenPayload } from "@/modules/auth";

export type AuthWithSessionResult = {
    user: User;
    accessToken: string;
    refreshToken: string;
};

function mapUser(doc: UserDoc): User {
    return {
        id: asID(doc._id.toString()),
        name: doc.name,
        email: doc.email ?? undefined,
        avatar: doc.avatar ?? undefined,
        role: doc.role,
    };
}

function hashRefreshToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
}

function isUserRole(value: unknown): value is UserRole {
    return value === USER_ROLES.USER || value === USER_ROLES.ADMIN;
}

function verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (
            typeof payload !== "object" ||
            payload === null ||
            typeof payload.userId !== "string" ||
            typeof payload.sessionId !== "string"
        ) {
            throw AuthErrors.invalidRefreshToken();
        }

        return {
            userId: payload.userId,
            sessionId: payload.sessionId,
        };
    } catch {
        throw AuthErrors.invalidRefreshToken();
    }
}

async function createAuthSession(
    user: User,
    meta?: { userAgent?: string; ip?: string },
): Promise<AuthWithSessionResult> {
    const tempSessionId = crypto.randomUUID();

    const tempTokens = issueAuthTokens({
        userId: String(user.id),
        role: user.role,
        sessionId: tempSessionId,
    });

    const session = await createSession({
        userId: String(user.id),
        refreshTokenHash: hashRefreshToken(tempTokens.refreshToken),
        userAgent: meta?.userAgent,
        ip: meta?.ip,
    });

    const tokens = issueAuthTokens({
        userId: String(user.id),
        role: user.role,
        sessionId: session._id.toString(),
    });

    session.refreshTokenHash = hashRefreshToken(tokens.refreshToken);
    await session.save();

    return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    };
}

export async function register(
    dto: RegisterDTO,
    meta?: { userAgent?: string; ip?: string },
): Promise<AuthWithSessionResult> {
    const existing = await UserModel.findOne({ email: dto.email }).select("_id").lean();

    if (existing) {
        throw AuthErrors.emailExists();
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const userDoc = await UserModel.create({
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        passwordHash,
        role: USER_ROLES.USER,
    });

    const user = mapUser(userDoc);

    return createAuthSession(user, meta);
}

export async function login(
    dto: LoginDTO,
    meta?: { userAgent?: string; ip?: string },
): Promise<AuthWithSessionResult> {
    const userDoc = await UserModel.findOne({ email: dto.email }).select("+passwordHash").exec();

    if (!userDoc) {
        throw AuthErrors.invalidCredentials();
    }

    const isPasswordValid = await bcrypt.compare(dto.password, userDoc.passwordHash);

    if (!isPasswordValid) {
        throw AuthErrors.invalidCredentials();
    }

    const user = mapUser(userDoc);

    return createAuthSession(user, meta);
}

export async function refreshSession(
    refreshToken: string,
    meta?: { userAgent?: string; ip?: string },
): Promise<AuthWithSessionResult> {
    const payload = verifyRefreshToken(refreshToken);

    const session = await SessionModel.findById(payload.sessionId).exec();

    if (!session) {
        throw AuthErrors.invalidRefreshToken();
    }

    if (session.userId !== payload.userId) {
        throw AuthErrors.invalidRefreshToken();
    }

    if (session.revokedAt) {
        throw AuthErrors.invalidRefreshToken();
    }

    if (session.expiresAt.getTime() <= Date.now()) {
        throw AuthErrors.invalidRefreshToken();
    }

    const incomingHash = hashRefreshToken(refreshToken);

    if (session.refreshTokenHash !== incomingHash) {
        session.revokedAt = new Date();
        session.lastUsedAt = new Date();
        session.userAgent = meta?.userAgent ?? session.userAgent;
        session.ip = meta?.ip ?? session.ip;

        await session.save();

        throw AuthErrors.invalidRefreshToken();
    }

    const userDoc = await UserModel.findById(session.userId).exec();

    if (!userDoc) {
        throw UserErrors.notFound();
    }

    const user = mapUser(userDoc);

    if (!isUserRole(user.role)) {
        throw AuthErrors.unauthorized();
    }

    const tokens = issueAuthTokens({
        userId: String(user.id),
        role: user.role,
        sessionId: session._id.toString(),
    });

    session.refreshTokenHash = hashRefreshToken(tokens.refreshToken);
    session.lastUsedAt = new Date();
    session.userAgent = meta?.userAgent ?? session.userAgent;
    session.ip = meta?.ip ?? session.ip;

    await session.save();

    return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    };
}

export async function logoutCurrentSession(sessionId: string): Promise<void> {
    if (!isValidObjectId(sessionId)) {
        return;
    }

    await SessionModel.findByIdAndUpdate(sessionId, {
        revokedAt: new Date(),
    }).exec();
}

export async function logoutAllSessions(userId: string): Promise<void> {
    if (!isValidObjectId(userId)) {
        return;
    }

    await SessionModel.updateMany(
        { userId, revokedAt: null },
        {
            $set: {
                revokedAt: new Date(),
            },
        },
    ).exec();
}
