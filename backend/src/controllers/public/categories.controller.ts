import type { Request, Response } from "express";

import { CommonErrors } from "@/errors";

import { toCategoryDTO, toCategoryEntity } from "@/mappers/category";
import { categoryService } from "@/services/categories.service";

type CategorySlugParams = {
    slug: string;
};

export async function getCategories(_req: Request, res: Response) {
    const docs = await categoryService.getPublicList();

    res.json(docs.map((doc) => toCategoryDTO(toCategoryEntity(doc))));
}

export async function getCategoryBySlug(req: Request<CategorySlugParams>, res: Response) {
    const { slug } = req.params;

    if (typeof slug !== "string" || !slug.trim()) {
        throw CommonErrors.badRequest("Invalid category slug");
    }

    const doc = await categoryService.getPublicBySlug(slug);

    res.json(toCategoryDTO(toCategoryEntity(doc)));
}
