import type { Request, Response } from "express";

import { CommonErrors } from "@/errors";

import { toCategoryDTO, toCategoryEntity } from "@/mappers/category";

import { categoryService } from "@/services";

type CategorySlugParams = {
    slug: string;
};

export async function getCategories(_req: Request, res: Response): Promise<void> {
    const docs = await categoryService.getPublicList();

    res.json(docs.map((doc) => toCategoryDTO(toCategoryEntity(doc))));
}

export async function getCategoryBySlug(
    req: Request<CategorySlugParams>,
    res: Response,
): Promise<void> {
    const slug = req.params.slug?.trim();

    if (!slug) {
        throw CommonErrors.badRequest("Invalid category slug");
    }

    const doc = await categoryService.getPublicBySlug(slug);

    res.json(toCategoryDTO(toCategoryEntity(doc)));
}
