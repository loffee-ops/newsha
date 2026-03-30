import type { Request, Response } from "express";

import type { ProductFiltersDTO } from "@shared/contracts/product";

import { ProductModel } from "@/models";

import { cacheGet, cacheSet } from "@/infrastructure/redis";

export async function getProductFilters(_req: Request, res: Response) {
    const key = "products:filters";

    const cached = await cacheGet<ProductFiltersDTO>(key);
    if (cached) {
        res.set("Cache-Control", "public, max-age=3600");
        return res.json(cached);
    }

    const [tags, needs, condition, volumes, priceAgg] = await Promise.all([
        ProductModel.distinct("tags", { isActive: true }),
        ProductModel.distinct("needs", { isActive: true }),
        ProductModel.distinct("condition", { isActive: true }),
        ProductModel.distinct("volumes.value", { isActive: true }),
        ProductModel.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: null,
                    min: { $min: "$price" },
                    max: { $max: "$price" },
                },
            },
        ]),
    ]);

    const priceRange = priceAgg[0]
        ? { min: Number(priceAgg[0].min ?? 0), max: Number(priceAgg[0].max ?? 0) }
        : { min: 0, max: 0 };

    const data: ProductFiltersDTO = {
        tags,
        needs,
        condition,
        volumes,
        price: priceRange,
    };

    await cacheSet(key, data, 3600);

    res.set("Cache-Control", "public, max-age=3600");
    res.json(data);
}
