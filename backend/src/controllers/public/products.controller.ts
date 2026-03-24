import type { Request, Response } from "express";

import type { ProductsQuery } from "@shared/contracts/product";

import { CommonErrors } from "@/errors";

import { ProductService } from "@/services/product.service";

const service = new ProductService();

function getParam(v: string | string[]): string {
    if (Array.isArray(v)) {
        throw CommonErrors.badRequest("Invalid param");
    }

    return v;
}

export async function getProducts(
    req: Request<unknown, unknown, unknown, ProductsQuery>,
    res: Response,
) {
    res.set("Cache-Control", "public, max-age=300");

    const items = await service.getList(req.query);

    res.json(items);
}

export async function getAllProducts(_req: Request, res: Response) {
    res.set("Cache-Control", "public, max-age=300");

    const items = await service.getList({});

    res.json(items);
}

export async function getProductById(req: Request, res: Response) {
    const id = getParam(req.params.id);

    res.set("Cache-Control", "public, max-age=600");

    const dto = await service.getById(id);

    res.json(dto);
}

export async function getProductBySlug(req: Request, res: Response) {
    const slug = getParam(req.params.slug);

    res.set("Cache-Control", "public, max-age=600");

    const dto = await service.getBySlug(slug);

    res.json(dto);
}

export async function searchProducts(req: Request, res: Response) {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

    if (!q) {
        throw CommonErrors.badRequest("Empty search");
    }

    const items = await service.search(q);

    res.json(items);
}

export async function createProduct(req: Request, res: Response) {
    const dto = await service.create(req.body);

    res.status(201).json(dto);
}
