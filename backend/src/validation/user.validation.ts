import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import type { ID } from "@shared/primitives";
import { asID } from "@shared/primitives";
import { USER_ROLES, type UserRole } from "@shared/domain/user";
import type { ChangePasswordDTO, UpdateProfileDTO } from "@shared/contracts/user/user.dto";
import { isValidName, isValidPassword, isValidPhone } from "@shared/lib/validation";

import { CommonErrors, AuthErrors, UserErrors } from "@/errors";

type AllowedUserRole = Exclude<UserRole, "guest">;

function isString(v: unknown): v is string {
    return typeof v === "string";
}

function isNonEmptyString(v: unknown): v is string {
    return isString(v) && v.trim().length > 0;
}

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

export function validateUpdateProfile(req: Request): UpdateProfileDTO {
    const body = req.body as Partial<UpdateProfileDTO>;

    if (!isNonEmptyString(body.name)) {
        throw CommonErrors.badRequest("Name is required");
    }

    if (!isValidName(body.name)) {
        throw CommonErrors.badRequest("Invalid name");
    }

    if (body.phone !== undefined) {
        if (!isString(body.phone) || !isValidPhone(body.phone)) {
            throw CommonErrors.badRequest("Invalid phone");
        }
    }

    if (body.avatar !== undefined) {
        if (!isString(body.avatar)) {
            throw CommonErrors.badRequest("Invalid avatar");
        }

        if (!body.avatar.trim()) {
            throw CommonErrors.badRequest("Invalid avatar");
        }
    }

    return {
        name: body.name.trim(),
        ...(body.phone !== undefined ? { phone: body.phone.trim() } : {}),
        ...(body.avatar !== undefined ? { avatar: body.avatar.trim() } : {}),
    };
}

export function validateChangePassword(req: Request): ChangePasswordDTO {
    const body = req.body as Partial<ChangePasswordDTO>;

    if (!isNonEmptyString(body.currentPassword)) {
        throw AuthErrors.passwordRequired();
    }

    if (!isNonEmptyString(body.newPassword)) {
        throw AuthErrors.passwordRequired();
    }

    if (!isValidPassword(body.newPassword)) {
        throw AuthErrors.weakPassword();
    }

    return {
        currentPassword: body.currentPassword,
        newPassword: body.newPassword,
    };
}
