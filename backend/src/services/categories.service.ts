import type { Request } from "express";

import { paginate, type PaginatedResult } from "@/lib/db";
import { CategoryModel } from "@/models/category.model";
import type { CategoryDoc } from "@/models/category.model";
import { CommonErrors } from "@/errors";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/validation/category.validation";

type UpdateCategoryChanges = Omit<UpdateCategoryInput, "id">;

export class CategoryService {
    async getAdminList(req: Request): Promise<PaginatedResult<CategoryDoc>> {
        const result = await paginate(CategoryModel, {}, req, {
            sort: { createdAt: -1 },
        });

        return {
            ...result,
            items: result.items as CategoryDoc[],
        };
    }

    async getPublicList(): Promise<CategoryDoc[]> {
        return CategoryModel.find({ isActive: true }).sort({ name: 1 }).lean<CategoryDoc[]>();
    }

    async getById(id: string): Promise<CategoryDoc> {
        const doc = await CategoryModel.findById(id).lean<CategoryDoc | null>();

        if (!doc) {
            throw CommonErrors.notFound("Category not found");
        }

        return doc;
    }

    async getPublicBySlug(slug: string): Promise<CategoryDoc> {
        const doc = await CategoryModel.findOne({
            slug: slug.trim().toLowerCase(),
            isActive: true,
        }).lean<CategoryDoc | null>();

        if (!doc) {
            throw CommonErrors.notFound("Category not found");
        }

        return doc;
    }

    async create(data: CreateCategoryInput): Promise<CategoryDoc> {
        const doc = await CategoryModel.create({
            name: data.name,
            nameEn: data.nameEn,
            nameUa: data.nameUa,
            slug: data.slug.trim().toLowerCase(),
            image: data.image ?? null,
            description: data.description ?? null,
            isActive: data.isActive ?? true,
        });

        return doc.toObject() as CategoryDoc;
    }

    async update(id: string, data: UpdateCategoryChanges): Promise<CategoryDoc> {
        const update: Record<string, unknown> = {};

        if (data.name !== undefined) update.name = data.name;
        if (data.nameEn !== undefined) update.nameEn = data.nameEn;
        if (data.nameUa !== undefined) update.nameUa = data.nameUa;
        if (data.slug !== undefined) update.slug = data.slug.trim().toLowerCase();
        if (data.image !== undefined) update.image = data.image;
        if (data.description !== undefined) update.description = data.description;
        if (data.isActive !== undefined) update.isActive = data.isActive;

        const doc = await CategoryModel.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true, runValidators: true },
        ).lean<CategoryDoc | null>();

        if (!doc) {
            throw CommonErrors.notFound("Category not found");
        }

        return doc;
    }

    async delete(id: string): Promise<void> {
        const doc = await CategoryModel.findByIdAndDelete(id);

        if (!doc) {
            throw CommonErrors.notFound("Category not found");
        }
    }

    async setActive(id: string, isActive: boolean): Promise<CategoryDoc> {
        const doc = await CategoryModel.findByIdAndUpdate(
            id,
            { $set: { isActive } },
            { new: true, runValidators: true },
        ).lean<CategoryDoc | null>();

        if (!doc) {
            throw CommonErrors.notFound("Category not found");
        }

        return doc;
    }
}

export const categoryService = new CategoryService();
