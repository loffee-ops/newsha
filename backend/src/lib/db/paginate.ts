import type { Model } from "mongoose";
import type { Request } from "express";

import { CommonErrors } from "@/errors";

type PaginateOptions = {
    page?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
};

export type PaginatedResult<T> = {
    items: T[];
    page: number;
    limit: number;
    total: number;
    pages: number;
};

function parsePositiveInt(v: unknown, fallback: number, max?: number) {
    if (v === undefined) {
        return fallback;
    }

    const n = Number(v);

    if (!Number.isInteger(n) || n <= 0) {
        throw CommonErrors.badRequest("Invalid pagination param");
    }

    if (max !== undefined && n > max) {
        throw CommonErrors.badRequest("Pagination param is too large");
    }

    return n;
}

type AnyModel = Model<unknown>;
type FilterOf = Record<string, unknown>;

export async function paginate<T>(
    model: AnyModel,
    filter: FilterOf,
    req: Request,
    options?: PaginateOptions,
): Promise<PaginatedResult<T>> {
    const page = parsePositiveInt(req.query.page, options?.page ?? 1);
    const limit = parsePositiveInt(req.query.limit, options?.limit ?? 20, 100);

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        model
            .find(filter)
            .sort(options?.sort ?? { createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean<T[]>(),
        model.countDocuments(filter),
    ]);

    const pages = Math.ceil(total / limit) || 1;

    return {
        items,
        page,
        limit,
        total,
        pages,
    };
}
