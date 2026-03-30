import type { Request, Response } from "express";

import { toBannerDTO } from "@/mappers/banner";

import { findActiveBannersByPlacement } from "@/services";

import { validatePlacementQuery } from "@/validation";

export async function getBanners(req: Request, res: Response) {
    const placement = validatePlacementQuery(req);

    const entities = await findActiveBannersByPlacement(placement);
    const banners = entities.map(toBannerDTO);

    res.json(banners);
}
