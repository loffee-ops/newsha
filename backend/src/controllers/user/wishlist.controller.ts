import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { asID } from "@shared/primitives";
import type { ID } from "@shared/primitives";
import type { WishlistItem } from "@shared/domain/wishlist";

import { AuthErrors, CommonErrors } from "@/errors";

import { WishlistService } from "@/services";

const service = new WishlistService();

function getUserId(req: Request): ID {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    return asID(req.userId);
}

function getProductId(req: Request): ID {
    const raw = req.body?.productId;

    if (typeof raw !== "string" || raw.trim().length === 0) {
        throw CommonErrors.badRequest("productId is required");
    }

    const productId = raw.trim();

    if (!isValidObjectId(productId)) {
        throw CommonErrors.badRequest("Invalid productId");
    }

    return asID(productId);
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
