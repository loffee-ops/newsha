import type { Request, Response } from "express";

import {
    getAllBannersAdmin,
    uploadBannerAdmin,
    updateBannerAdmin,
    deleteBannerAdmin,
} from "@/services/admin.banner.service";

import { validateUploadBanner, validateUpdateBanner, validateBannerId } from "@/validation";

export async function getAllBanners(req: Request, res: Response) {
    const result = await getAllBannersAdmin(req);

    res.json(result);
}

export async function uploadBanner(req: Request, res: Response) {
    const fileBuffer = req.file?.buffer;

    const input = validateUploadBanner(req);

    const banner = await uploadBannerAdmin({
        fileBuffer,
        input,
    });

    res.status(201).json(banner);
}

export async function updateBanner(req: Request, res: Response) {
    const input = validateUpdateBanner(req);

    const banner = await updateBannerAdmin(input);

    res.json(banner);
}

export async function deleteBanner(req: Request, res: Response) {
    const id = validateBannerId(req);

    await deleteBannerAdmin(id);

    res.json({ ok: true });
}
