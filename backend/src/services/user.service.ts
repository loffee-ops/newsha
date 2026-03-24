import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import type { User } from "@shared/domain/user";

import { UserModel, type UserDoc } from "@/models/user.model";
import { SessionModel } from "@/models/session.model";
import { toUser } from "@/mappers/user";
import { paginate, type PaginatedResult } from "@/lib/db";
import { AuthErrors, CommonErrors, UserErrors } from "@/errors";

function validateUserId(id: string) {
    if (!isValidObjectId(id)) {
        throw CommonErrors.badRequest("Invalid user id");
    }
}

export class UserService {
    async getAdminList(req: Request): Promise<PaginatedResult<User>> {
        const result = await paginate<UserDoc>(UserModel, {}, req, {
            sort: { createdAt: -1 },
        });

        return {
            ...result,
            items: result.items.map((item) => toUser(item)),
        };
    }

    async getById(id: string): Promise<User> {
        const doc = await UserModel.findById(id).exec();

        if (!doc) {
            throw UserErrors.notFound();
        }

        return toUser(doc);
    }

    async updateRole(id: string, role: "user" | "admin"): Promise<User> {
        const doc = await UserModel.findByIdAndUpdate(
            id,
            { $set: { role } },
            {
                new: true,
                runValidators: true,
            },
        ).exec();

        if (!doc) {
            throw UserErrors.notFound();
        }

        return toUser(doc);
    }

    async delete(id: string): Promise<void> {
        const doc = await UserModel.findByIdAndDelete(id).exec();

        if (!doc) {
            throw UserErrors.notFound();
        }
    }

    async getUserById(id: string): Promise<User> {
        validateUserId(id);

        const userDoc = await UserModel.findById(id).exec();

        if (!userDoc) {
            throw UserErrors.notFound();
        }

        return toUser(userDoc);
    }

    async getUserSessions(userId: string) {
        validateUserId(userId);

        const sessions = await SessionModel.find({
            userId,
            revokedAt: null,
        })
            .sort({ createdAt: -1 })
            .lean();

        return sessions.map((session) => ({
            id: String(session._id),
            userId: session.userId,
            expiresAt: session.expiresAt,
            revokedAt: session.revokedAt,
            replacedBySessionId: session.replacedBySessionId,
            lastUsedAt: session.lastUsedAt,
            userAgent: session.userAgent,
            ip: session.ip,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
        }));
    }

    async revokeSessionById(userId: string, sessionId: string): Promise<void> {
        validateUserId(userId);

        if (!isValidObjectId(sessionId)) {
            throw CommonErrors.badRequest("Invalid session id");
        }

        const session = await SessionModel.findOne({
            _id: sessionId,
            userId,
            revokedAt: null,
        }).exec();

        if (!session) {
            throw AuthErrors.invalidRefreshToken("Session not found or already revoked");
        }

        session.revokedAt = new Date();
        await session.save();
    }
}

export const userService = new UserService();
