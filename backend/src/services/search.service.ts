import type { ProductDTO } from "@shared/contracts/product";
import type { SearchParamsDTO } from "@shared/contracts/search";
import { normalizeSearchText } from "@shared/lib/search";

import { toProductDTO } from "@/mappers/product";
import { ProductModel, type ProductDoc } from "@/models/product.model";
import { ProductSearchModel, type ProductSearchDoc } from "@/models/product-search.model";
import { CommonErrors } from "@/errors";

function validateLimit(limit: number) {
    if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
        throw CommonErrors.badRequest("Invalid limit");
    }
}

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class SearchService {
    async searchProducts(params: SearchParamsDTO): Promise<ProductDTO[]> {
        const query = normalizeSearchText(params.query);

        if (!query) {
            return [];
        }

        const limit = params.limit ?? 10;
        validateLimit(limit);

        const regex = new RegExp(escapeRegex(query), "i");

        const hits = await ProductSearchModel.find({
            isActive: true,
            text: regex,
        })
            .limit(limit)
            .lean<ProductSearchDoc[]>();

        if (hits.length === 0) {
            return [];
        }

        const ids = hits.map((hit) => String(hit.productId));

        const products = await ProductModel.find({
            _id: { $in: ids },
            isActive: true,
        }).lean<ProductDoc[]>();

        const productById = new Map<string, ProductDTO>(
            products.map((product) => [String(product._id), toProductDTO(product)]),
        );

        return ids
            .map((id) => productById.get(id))
            .filter((item): item is ProductDTO => Boolean(item));
    }
}
