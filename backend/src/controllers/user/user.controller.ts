import type { Request, Response } from "express";

import { AuthErrors } from "@/errors";
import { userService } from "@/services/user.service";
import { validateUpdateProfile, validateChangePassword } from "@/validation/user.validation";

function requireUserId(req: Request): string {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    return req.userId;
}

export async function getMeHandler(req: Request, res: Response) {
    const userId = requireUserId(req);
    const user = await userService.getUserById(userId);

    res.json({ user });
}

export async function updateMeHandler(req: Request, res: Response) {
    const userId = requireUserId(req);
    const dto = validateUpdateProfile(req);

    const user = await userService.updateProfile(userId, dto);

    res.json({ user });
}

export async function changePasswordHandler(req: Request, res: Response) {
    const userId = requireUserId(req);
    const dto = validateChangePassword(req);

    await userService.changePassword(userId, dto);

    res.json({ ok: true });
}
