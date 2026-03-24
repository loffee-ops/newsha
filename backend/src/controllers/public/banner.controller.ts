import type { Request, Response } from "express";

import { findActiveBannersByPlacement } from "@/services/banner.service";
import { toBannerDTO } from "@/mappers/banner";
import { validatePlacementQuery } from "@/validation/banner.validation";

export async function getBanners(req: Request, res: Response) {
    const placement = validatePlacementQuery(req);

    const entities = await findActiveBannersByPlacement(placement);
    const banners = entities.map(toBannerDTO);

    res.json(banners);
}
