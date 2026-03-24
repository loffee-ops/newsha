import type { Request, Response, NextFunction } from "express";

import { USER_ROLES } from "@shared/domain/user";

import { UserModel } from "@/models/user.model";
import { AuthErrors, CommonErrors } from "@/errors";

export async function requireAdmin(req: Request, _res: Response, next: NextFunction) {
    try {
        if (!req.userId) {
            throw AuthErrors.unauthorized();
        }

        const user = await UserModel.findById(req.userId)
            .select("role")
            .lean<{ role: string } | null>();

        if (!user) {
            throw AuthErrors.unauthorized();
        }

        if (user.role !== USER_ROLES.ADMIN) {
            throw CommonErrors.forbidden();
        }

        next();
    } catch (error) {
        next(error);
    }
}
