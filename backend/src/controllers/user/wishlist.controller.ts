import type { Request, Response } from "express";

import { asID } from "@shared/primitives";
import type { WishlistItem } from "@shared/domain/wishlist";

import { AuthErrors, CommonErrors } from "@/errors";
import { WishlistService } from "@/services/wishlist.service";

const service = new WishlistService();

function getUserId(req: Request) {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    return asID(req.userId);
}

function getProductId(req: Request) {
    const raw = req.body?.productId;

    if (typeof raw !== "string" || raw.trim().length === 0) {
        throw CommonErrors.badRequest("productId is required");
    }

    return asID(raw.trim());
}

function toWishlistResponse(items: readonly WishlistItem[]) {
    return {
        items: items.map((item) => item.productId),
    };
}

export async function getWishlist(req: Request, res: Response) {
    const userId = getUserId(req);
    const wishlist = await service.getWishlist(userId);

    res.json(toWishlistResponse(wishlist.items));
}

export async function addToWishlist(req: Request, res: Response) {
    const userId = getUserId(req);
    const productId = getProductId(req);

    const wishlist = await service.add(userId, productId);

    res.json(toWishlistResponse(wishlist.items));
}

export async function removeFromWishlist(req: Request, res: Response) {
    const userId = getUserId(req);
    const productId = getProductId(req);

    const wishlist = await service.remove(userId, productId);

    res.json(toWishlistResponse(wishlist.items));
}

export async function toggleWishlist(req: Request, res: Response) {
    const userId = getUserId(req);
    const productId = getProductId(req);

    const wishlist = await service.toggle(userId, productId);

    res.json(toWishlistResponse(wishlist.items));
}
