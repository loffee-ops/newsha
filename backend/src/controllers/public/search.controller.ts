import type { Request, Response } from "express";

import { CommonErrors } from "@/errors";

import { SearchService } from "@/services";

const service = new SearchService();

export async function search(req: Request, res: Response) {
    const rawQuery = req.query.q;

    if (typeof rawQuery !== "string" || !rawQuery.trim()) {
        throw CommonErrors.badRequest("Query is required");
    }

    const query = rawQuery.trim();

    const rawLimit = req.query.limit;
    let limit: number | undefined;

    if (typeof rawLimit === "string" && rawLimit.trim()) {
        const parsed = Number(rawLimit);

        if (!Number.isFinite(parsed)) {
            throw CommonErrors.badRequest("Invalid limit");
        }

        limit = parsed;
    }

    const items = await service.searchProducts({
        query,
        limit,
    });

    res.json({ items });
}
