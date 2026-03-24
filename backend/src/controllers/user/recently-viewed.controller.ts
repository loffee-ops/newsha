import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { asID } from "@shared/primitives";

import { CommonErrors, AuthErrors } from "@/errors";
import { RecentlyViewedService } from "@/services/recently-viewed.service";

const service = new RecentlyViewedService();

function getUserId(req: Request) {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    return asID(req.userId);
}

function getProductId(req: Request) {
    const raw = req.params.productId;

    if (typeof raw !== "string" || raw.trim().length === 0) {
        throw CommonErrors.badRequest("productId is required");
    }

    const productId = raw.trim();

    if (!isValidObjectId(productId)) {
        throw CommonErrors.badRequest("Invalid productId");
    }

    return asID(productId);
}

export async function addRecentlyViewed(req: Request, res: Response) {
    const userId = getUserId(req);
    const productId = getProductId(req);

    await service.add(userId, productId);

    res.json({ ok: true });
}

export async function getRecentlyViewed(req: Request, res: Response) {
    const userId = getUserId(req);
    const items = await service.get(userId);

    res.json({ items });
}
