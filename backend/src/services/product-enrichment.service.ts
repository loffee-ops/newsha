import type { ProductDTO } from "@shared/contracts/product";
import type { CategoryDTO } from "@shared/contracts/category";

import { CategoryModel } from "@/models/category.model";
import type { CategoryPersistence } from "@/mappers/category";
import { toCategoryEntity, toCategoryDTO } from "@/mappers/category";

export type EnrichedProduct = {
    product: ProductDTO;
    category?: CategoryDTO;
};

function uniq(arr: readonly string[]): string[] {
    return Array.from(new Set(arr));
}

export class ProductEnrichmentService {
    async enrichOne(dto: ProductDTO): Promise<EnrichedProduct> {
        const categoryId = String(dto.categoryId);

        const categoryDoc = await CategoryModel.findOne({
            _id: categoryId,
            isActive: true,
        }).lean<CategoryPersistence | null>();

        return {
            product: dto,
            category: categoryDoc ? toCategoryDTO(toCategoryEntity(categoryDoc)) : undefined,
        };
    }

    async enrichMany(dtos: readonly ProductDTO[]): Promise<EnrichedProduct[]> {
        if (dtos.length === 0) {
            return [];
        }

        const categoryIds = uniq(
            dtos
                .map((product) => product.categoryId)
                .filter(
                    (categoryId): categoryId is NonNullable<typeof categoryId> =>
                        categoryId != null,
                )
                .map((categoryId) => String(categoryId)),
        );

        if (categoryIds.length === 0) {
            return dtos.map((product) => ({
                product,
                category: undefined,
            }));
        }

        const categoryDocs = await CategoryModel.find({
            _id: { $in: categoryIds },
            isActive: true,
        }).lean<CategoryPersistence[]>();

        const categoryById = new Map<string, CategoryDTO>();

        for (const categoryDoc of categoryDocs) {
            categoryById.set(String(categoryDoc._id), toCategoryDTO(toCategoryEntity(categoryDoc)));
        }

        return dtos.map((product) => ({
            product,
            category: product.categoryId ? categoryById.get(String(product.categoryId)) : undefined,
        }));
    }
}
