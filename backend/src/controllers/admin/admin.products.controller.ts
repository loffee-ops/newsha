import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { CommonErrors } from "@/errors";

import { ProductService } from "@/services";

const service = new ProductService();

function getParam(value: string | string[]): string {
    if (Array.isArray(value)) {
        throw CommonErrors.badRequest("Invalid param");
    }

    return value;
}

function validateProductId(req: Request): string {
    const id = getParam(req.params.id);

    if (!isValidObjectId(id)) {
        throw CommonErrors.badRequest("Invalid product id");
    }

    return id;
}

export async function getAllProductsAdmin(req: Request, res: Response) {
    const result = await service.getAdminList(req);

    res.json(result);
}

export async function getProductByIdAdmin(req: Request, res: Response) {
    const id = validateProductId(req);
    const dto = await service.getAdminById(id);

    res.json(dto);
}

export async function createProductAdmin(req: Request, res: Response) {
    const dto = await service.create(req.body);

    res.status(201).json(dto);
}

export async function updateProductAdmin(req: Request, res: Response) {
    const id = validateProductId(req);
    const dto = await service.update(id, req.body);

    res.json(dto);
}

export async function deleteProductAdmin(req: Request, res: Response) {
    const id = validateProductId(req);

    await service.delete(id);

    res.json({ ok: true });
}

export async function setProductActive(req: Request, res: Response) {
    const id = validateProductId(req);

    const { isActive } = req.body as { isActive?: unknown };

    if (typeof isActive !== "boolean") {
        throw CommonErrors.badRequest("isActive must be boolean");
    }

    const dto = await service.setActive(id, isActive);

    res.json(dto);
}

type ProductFlagsPayload = {
    isNew?: unknown;
    isBestseller?: unknown;
    isTop?: unknown;
};

export async function setProductFlags(req: Request, res: Response) {
    const id = validateProductId(req);

    const body = req.body as ProductFlagsPayload;

    if (
        typeof body.isNew !== "boolean" &&
        typeof body.isBestseller !== "boolean" &&
        typeof body.isTop !== "boolean"
    ) {
        throw CommonErrors.badRequest("At least one of isNew, isBestseller, isTop must be boolean");
    }

    const dto = await service.setFlags(id, {
        isNew: typeof body.isNew === "boolean" ? body.isNew : undefined,
        isBestseller: typeof body.isBestseller === "boolean" ? body.isBestseller : undefined,
        isTop: typeof body.isTop === "boolean" ? body.isTop : undefined,
    });

    res.json(dto);
}
