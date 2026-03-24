import type { Request } from "express";

import type { LoginDTO, RegisterDTO } from "@shared/contracts/auth";
import { isValidEmail, isValidPhone, isValidName, isValidPassword } from "@shared/lib/validation";

import { AuthErrors } from "@/errors";

function isString(v: unknown): v is string {
    return typeof v === "string";
}

function isNonEmptyString(v: unknown): v is string {
    return isString(v) && v.trim().length > 0;
}

export function validateRegister(req: Request): RegisterDTO {
    const body = req.body as Partial<RegisterDTO>;

    if (!isNonEmptyString(body.name)) {
        throw AuthErrors.nameRequired();
    }

    if (!isValidName(body.name)) {
        throw AuthErrors.invalidName();
    }

    if (!isNonEmptyString(body.phone)) {
        throw AuthErrors.phoneRequired();
    }

    if (!isValidPhone(body.phone)) {
        throw AuthErrors.invalidPhone();
    }

    if (!isNonEmptyString(body.email)) {
        throw AuthErrors.emailRequired();
    }

    if (!isValidEmail(body.email)) {
        throw AuthErrors.invalidEmail();
    }

    if (!isNonEmptyString(body.password)) {
        throw AuthErrors.passwordRequired();
    }

    if (!isValidPassword(body.password)) {
        throw AuthErrors.weakPassword();
    }

    return {
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email.trim().toLowerCase(),
        password: body.password,
    };
}

export function validateLogin(req: Request): LoginDTO {
    const body = req.body as Partial<LoginDTO>;

    if (!isNonEmptyString(body.email)) {
        throw AuthErrors.emailRequired();
    }

    if (!isValidEmail(body.email)) {
        throw AuthErrors.invalidEmail();
    }

    if (!isNonEmptyString(body.password)) {
        throw AuthErrors.passwordRequired();
    }

    return {
        email: body.email.trim().toLowerCase(),
        password: body.password,
    };
}
