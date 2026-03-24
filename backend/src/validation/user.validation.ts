import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import { asID } from "@shared/primitives";
import type { ID } from "@shared/primitives";
import { USER_ROLES, type UserRole } from "@shared/domain/user";

import { CommonErrors, UserErrors } from "@/errors";

type AllowedUserRole = Exclude<UserRole, "guest">;

function getSingleParam(value: string | string[], fieldName = "param"): string {
    if (Array.isArray(value)) {
        throw CommonErrors.badRequest(`Invalid ${fieldName}`);
    }

    return value;
}

export function validateUserId(req: Request): ID {
    const id = getSingleParam(req.params.id, "user id");

    if (!isValidObjectId(id)) {
        throw UserErrors.invalidUserId();
    }

    return asID(id);
}

export function validateUserRole(value: unknown): AllowedUserRole {
    if (value !== USER_ROLES.USER && value !== USER_ROLES.ADMIN) {
        throw UserErrors.invalidRole();
    }

    return value;
}
