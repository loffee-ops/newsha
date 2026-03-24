import type { Request, Response } from "express";

import { CommonErrors } from "@/errors";

import { loginWithGoogle } from "@/services/google-auth.service";
import { setAuthCookie } from "@/controllers/auth/auth.controller";

function validateIdToken(value: unknown): string {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw CommonErrors.badRequest("Missing idToken");
    }

    return value.trim();
}

export async function googleLoginHandler(req: Request, res: Response) {
    const idToken = validateIdToken(req.body?.idToken);

    const result = await loginWithGoogle(idToken);

    setAuthCookie(res, result.token);

    res.json({ user: result.user });
}
