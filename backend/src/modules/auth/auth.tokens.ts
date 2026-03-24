import jwt, { type SignOptions } from "jsonwebtoken";

import { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "@/config";

import type { UserRole } from "@shared/domain/user";

export type AccessTokenPayload = {
    userId: string;
    role: UserRole;
    sessionId: string;
};

export type RefreshTokenPayload = {
    userId: string;
    sessionId: string;
};

const accessTokenExpiresIn: SignOptions["expiresIn"] =
    ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];

const refreshTokenExpiresIn: SignOptions["expiresIn"] =
    REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];

export function signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: accessTokenExpiresIn,
    });
}

export function signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: refreshTokenExpiresIn,
    });
}

export function issueAuthTokens(input: { userId: string; role: UserRole; sessionId: string }) {
    const accessToken = signAccessToken({
        userId: input.userId,
        role: input.role,
        sessionId: input.sessionId,
    });

    const refreshToken = signRefreshToken({
        userId: input.userId,
        sessionId: input.sessionId,
    });

    return {
        accessToken,
        refreshToken,
    };
}
