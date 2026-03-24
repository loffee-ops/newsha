import type { Request, Response } from "express";

import { OrderService } from "@/services/order.service";
import {
    validateAdminOrderFilters,
    validateOrderId,
    validateSetOrderStatus,
} from "@/validation/order.validation";

const service = new OrderService();

type OrderParams = {
    id: string;
};

export async function getAllOrders(req: Request, res: Response) {
    const filters = validateAdminOrderFilters(req);
    const result = await service.getAdminOrdersPaginated(req, filters);

    res.json(result);
}

export async function getOrderById(req: Request<OrderParams>, res: Response) {
    const id = validateOrderId(req);
    const order = await service.getById(id);

    res.json(order);
}

export async function updateOrderStatus(req: Request<OrderParams>, res: Response) {
    const input = validateSetOrderStatus(req);
    const order = await service.updateStatus(input.id, input.status);

    res.json(order);
}
