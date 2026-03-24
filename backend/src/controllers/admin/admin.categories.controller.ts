import type { Request, Response } from "express";

import { CommonErrors } from "@/errors";

import { toCategoryDTO, toCategoryEntity } from "@/mappers/category";
import { categoryService } from "@/services/categories.service";
import {
    validateCategoryId,
    validateCreateCategory,
    validateUpdateCategory,
} from "@/validation/category.validation";

export async function getAllCategoriesAdmin(req: Request, res: Response) {
    const result = await categoryService.getAdminList(req);

    res.json({
        ...result,
        items: result.items.map((item) => toCategoryDTO(toCategoryEntity(item))),
    });
}

export async function getCategoryByIdAdmin(req: Request<{ id: string }>, res: Response) {
    const id = validateCategoryId(req);
    const category = await categoryService.getById(id);

    res.json(toCategoryDTO(toCategoryEntity(category)));
}

export async function createCategoryAdmin(req: Request, res: Response) {
    const input = validateCreateCategory(req);
    const category = await categoryService.create(input);

    res.status(201).json(toCategoryDTO(toCategoryEntity(category)));
}

export async function updateCategoryAdmin(req: Request<{ id: string }>, res: Response) {
    const input = validateUpdateCategory(req);
    const { id, ...changes } = input;

    const category = await categoryService.update(id, changes);

    res.json(toCategoryDTO(toCategoryEntity(category)));
}

export async function deleteCategoryAdmin(req: Request<{ id: string }>, res: Response) {
    const id = validateCategoryId(req);

    await categoryService.delete(id);

    res.json({ ok: true });
}

export async function setCategoryActive(req: Request<{ id: string }>, res: Response) {
    const id = validateCategoryId(req);
    const { isActive } = req.body as { isActive?: unknown };

    if (typeof isActive !== "boolean") {
        throw CommonErrors.badRequest("isActive must be boolean");
    }

    const category = await categoryService.setActive(id, isActive);

    res.json(toCategoryDTO(toCategoryEntity(category)));
}
