import type { Request, Response } from "express";

import { ID, asID } from "@shared/primitives";

import { AuthErrors } from "@/errors";

import { OrderService } from "@/services/order.service";
import { validateCheckout } from "@/validation/order.validation";

const service = new OrderService();

function getUserId(req: Request): ID {
    if (!req.userId) {
        throw AuthErrors.unauthorized();
    }

    return asID(req.userId);
}

export async function checkout(req: Request, res: Response) {
    const userId = getUserId(req);
    const dto = validateCheckout(req);

    const order = await service.createFromCheckout(userId, dto);

    res.json(order);
}

export async function getMyOrders(req: Request, res: Response) {
    const userId = getUserId(req);

    const result = await service.getUserOrdersPaginated(userId, req);

    res.json(result);
}
