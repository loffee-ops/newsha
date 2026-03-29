import type { Request } from "express";
import { isValidObjectId } from "mongoose";

import type { PaginatedResponse } from "@shared/contracts/pagination";
import type { ProductDTO } from "@shared/contracts/product";
import type { ProductsQuery } from "@shared/contracts/product";
import type { ProductFilter } from "@/modules/product";

import { cacheGet, cacheSet, cacheDel, redis } from "@/infrastructure/redis";
import { indexProduct, removeProductFromIndex } from "@/modules/search";

import { ProductModel, type ProductDoc } from "@/models/product.model";
import { toProductDTO } from "@/mappers/product";
import { paginate, type PaginatedResult } from "@/lib/db";
import { CommonErrors, ProductErrors } from "@/errors";
import { SearchService } from "./search.service";

function toDTO(doc: ProductDoc): ProductDTO {
    return toProductDTO(doc);
}

function validateId(id: string) {
    if (!isValidObjectId(id)) {
        throw ProductErrors.invalidProductId();
    }
}

type ProductCacheDoc = {
    _id: { toString(): string };
    slug: string;
    isActive: boolean;
};

const searchService = new SearchService();

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export class ProductService {
    async getList(query: ProductsQuery): Promise<PaginatedResponse<ProductDTO>> {
        const key = `products:list:${JSON.stringify(query)}`;

        const cached = await cacheGet<PaginatedResponse<ProductDTO>>(key);
        if (cached) {
            return cached;
        }

        const filter = this.buildFilter(query);

        const rawPage = Number((query as ProductsQuery & { page?: number | string }).page);
        const rawLimit = Number((query as ProductsQuery & { limit?: number | string }).limit);

        const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : DEFAULT_PAGE;
        const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : DEFAULT_LIMIT;
        const skip = (page - 1) * limit;

        const [docs, total] = await Promise.all([
            ProductModel.find(filter).skip(skip).limit(limit).lean<ProductDoc[]>(),
            ProductModel.countDocuments(filter),
        ]);

        const totalPages = Math.max(1, Math.ceil(total / limit));
        const safePage = Math.min(page, totalPages);

        const dto: PaginatedResponse<ProductDTO> = {
            data: docs.map(toDTO),
            meta: {
                page: safePage,
                limit,
                total,
                totalPages,
                hasNext: safePage < totalPages,
                hasPrev: safePage > 1,
            },
        };

        await cacheSet(key, dto, 300);

        return dto;
    }

    async getById(id: string): Promise<ProductDTO> {
        validateId(id);

        const key = `product:${id}`;

        const cached = await cacheGet<ProductDTO>(key);
        if (cached) {
            return cached;
        }

        const doc = await ProductModel.findOne({
            _id: id,
            isActive: true,
        }).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        const dto = toDTO(doc);

        await cacheSet(key, dto, 600);

        return dto;
    }

    async getBySlug(slug: string): Promise<ProductDTO> {
        const normalizedSlug = slug.trim();

        if (!normalizedSlug) {
            throw CommonErrors.badRequest("Invalid slug");
        }

        const key = `product:slug:${normalizedSlug}`;

        const cached = await cacheGet<ProductDTO>(key);
        if (cached) {
            return cached;
        }

        const doc = await ProductModel.findOne({
            slug: normalizedSlug,
            isActive: true,
        }).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        const dto = toDTO(doc);

        await cacheSet(key, dto, 600);

        return dto;
    }

    async search(q: string, limit = 10): Promise<ProductDTO[]> {
        return searchService.searchProducts({
            query: q,
            limit,
        });
    }

    async getAdminList(req: Request): Promise<PaginatedResult<ProductDTO>> {
        const result = await paginate(ProductModel, {}, req, {
            sort: { createdAt: -1 },
        });

        return {
            ...result,
            items: (result.items as ProductDoc[]).map(toDTO),
        };
    }

    async getAdminById(id: string): Promise<ProductDTO> {
        validateId(id);

        const doc = await ProductModel.findById(id).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        return toDTO(doc);
    }

    async create(data: Partial<ProductDoc>): Promise<ProductDTO> {
        const doc = await ProductModel.create(data);

        await this.invalidateCaches(doc);

        if (doc.isActive) {
            await indexProduct(doc._id.toString());
        } else {
            await removeProductFromIndex(doc._id.toString());
        }

        return toDTO(doc);
    }

    async update(id: string, data: Partial<ProductDoc>): Promise<ProductDTO> {
        validateId(id);

        const doc = await ProductModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true },
        ).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        await this.invalidateCaches(doc);

        if (doc.isActive) {
            await indexProduct(doc._id.toString());
        } else {
            await removeProductFromIndex(doc._id.toString());
        }

        return toDTO(doc);
    }

    async delete(id: string): Promise<void> {
        validateId(id);

        const doc = await ProductModel.findByIdAndDelete(id).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        await this.invalidateCaches(doc);
        await removeProductFromIndex(id);
    }

    async setActive(id: string, isActive: boolean): Promise<ProductDTO> {
        validateId(id);

        const doc = await ProductModel.findByIdAndUpdate(
            id,
            { $set: { isActive } },
            { new: true, runValidators: true },
        ).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        await this.invalidateCaches(doc);

        if (isActive) {
            await indexProduct(doc._id.toString());
        } else {
            await removeProductFromIndex(doc._id.toString());
        }

        return toDTO(doc);
    }

    async setFlags(
        id: string,
        flags: {
            isNew?: boolean;
            isBestseller?: boolean;
            isTop?: boolean;
        },
    ): Promise<ProductDTO> {
        validateId(id);

        const update: Partial<ProductDoc> = {};

        if (typeof flags.isNew === "boolean") {
            update.isNewArrival = flags.isNew;
        }

        if (typeof flags.isBestseller === "boolean") {
            update.isBestseller = flags.isBestseller;
        }

        if (typeof flags.isTop === "boolean") {
            update.isTop = flags.isTop;
        }

        const doc = await ProductModel.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true, runValidators: true },
        ).lean<ProductDoc | null>();

        if (!doc) {
            throw ProductErrors.notFound();
        }

        await this.invalidateCaches(doc);

        if (doc.isActive) {
            await indexProduct(doc._id.toString());
        } else {
            await removeProductFromIndex(doc._id.toString());
        }

        return toDTO(doc);
    }

    private async invalidateCaches(doc: ProductCacheDoc) {
        const id = doc._id.toString();
        const slug = doc.slug;

        const listKeys = await redis.keys("products:list:*");
        const deleteListPromise = listKeys.length > 0 ? redis.del(...listKeys) : Promise.resolve(0);

        await Promise.all([
            cacheDel(`product:${id}`),
            cacheDel(`product:slug:${slug}`),
            deleteListPromise,
            cacheDel("products:filters"),
        ]);
    }

    private buildFilter(q: ProductsQuery): ProductFilter {
        const filter: ProductFilter = { isActive: true };

        if (q.categoryId) {
            filter.categoryId = q.categoryId;
        }

        if (q.tags) {
            filter.tags = q.tags;
        }

        if (q.needs) {
            filter.needs = q.needs;
        }

        if (q.condition) {
            filter.condition = q.condition;
        }

        if (q.volume !== undefined) {
            const value = Number(q.volume);

            if (!Number.isFinite(value)) {
                throw CommonErrors.badRequest("Invalid volume");
            }

            filter["volumes.value"] = value;
        }

        if (q.minPrice !== undefined || q.maxPrice !== undefined) {
            filter.price = {};

            if (q.minPrice !== undefined) {
                const value = Number(q.minPrice);

                if (!Number.isFinite(value)) {
                    throw CommonErrors.badRequest("Invalid minPrice");
                }

                filter.price.$gte = value;
            }

            if (q.maxPrice !== undefined) {
                const value = Number(q.maxPrice);

                if (!Number.isFinite(value)) {
                    throw CommonErrors.badRequest("Invalid maxPrice");
                }

                filter.price.$lte = value;
            }
        }

        if (q.isBestseller === "true") {
            filter.isBestseller = true;
        }

        if (q.isNew === "true") {
            filter.isNewArrival = true;
        }

        if (q.isTop === "true") {
            filter.isTop = true;
        }

        return filter;
    }
}
