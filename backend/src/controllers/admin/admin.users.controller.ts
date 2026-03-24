import type { Request, Response } from "express";

import { userService } from "@/services/user.service";
import { validateUserId, validateUserRole } from "@/validation/user.validation";

export async function getAllUsers(req: Request, res: Response) {
    const result = await userService.getAdminList(req);

    res.json(result);
}

export async function getUserById(req: Request, res: Response) {
    const id = validateUserId(req);
    const user = await userService.getById(id);

    res.json(user);
}

export async function updateUserRole(req: Request, res: Response) {
    const id = validateUserId(req);
    const role = validateUserRole(req.body?.role);

    const user = await userService.updateRole(id, role);

    res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const id = validateUserId(req);

    await userService.delete(id);

    res.json({ ok: true });
}
