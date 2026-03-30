import type { Request, Response } from "express";

import { asID } from "@shared/primitives";

import { AuthErrors } from "@/errors";

import { CartService } from "@/services";

import { validateAddToCart, validateRemoveFromCart } from "@/validation";

const cartService = new CartService();

function getUserId(req: Request) {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    return asID(req.userId);
}

export async function getCart(req: Request, res: Response) {
    const userId = getUserId(req);
    const rows = await cartService.getCartRows(userId);

    res.json({ items: rows });
}

export async function addToCart(req: Request, res: Response) {
    const userId = getUserId(req);
    const dto = validateAddToCart(req);

    const rows = await cartService.addToCart(userId, dto);

    res.json({ items: rows });
}

export async function removeFromCart(req: Request, res: Response) {
    const userId = getUserId(req);
    const dto = validateRemoveFromCart(req);

    const rows = await cartService.removeFromCart(userId, dto);

    res.json({ items: rows });
}

export async function clearCart(req: Request, res: Response) {
    const userId = getUserId(req);
    await cartService.clearCart(userId);

    res.json({ items: [] });
}
