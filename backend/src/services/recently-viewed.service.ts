import type { ProductDTO } from "@shared/contracts/product";
import type { ID } from "@shared/primitives";

import { RecentlyViewedModel, type RecentlyViewedDoc } from "@/models/recently-viewed.model";
import { ProductModel, type ProductDoc } from "@/models/product.model";
import { toProductDTO } from "@/mappers/product";
import { ProductErrors } from "@/errors";

const LIMIT = 20;

function isProductDTO(value: ProductDTO | undefined): value is ProductDTO {
    return value !== undefined;
}

export class RecentlyViewedService {
    async add(userId: ID, productId: ID): Promise<void> {
        const userIdStr = String(userId);
        const productIdStr = String(productId);

        const product = await ProductModel.findOne({
            _id: productIdStr,
            isActive: true,
        }).lean<ProductDoc | null>();

        if (!product) {
            throw ProductErrors.notFound();
        }

        await RecentlyViewedModel.updateOne(
            { userId: userIdStr, productId: productIdStr },
            {
                $set: {
                    userId: userIdStr,
                    productId: productIdStr,
                    viewedAt: new Date(),
                },
            },
            { upsert: true },
        );

        const docs = await RecentlyViewedModel.find({ userId: userIdStr })
            .sort({ viewedAt: -1 })
            .skip(LIMIT)
            .select("_id")
            .lean<Array<Pick<RecentlyViewedDoc, "_id">>>();

        if (docs.length > 0) {
            await RecentlyViewedModel.deleteMany({
                _id: { $in: docs.map((doc) => doc._id) },
            });
        }
    }

    async get(userId: ID): Promise<readonly ProductDTO[]> {
        const userIdStr = String(userId);

        const rows = await RecentlyViewedModel.find({ userId: userIdStr })
            .sort({ viewedAt: -1 })
            .limit(LIMIT)
            .lean<RecentlyViewedDoc[]>();

        const productIds = rows.map((row) => String(row.productId));

        if (productIds.length === 0) {
            return [];
        }

        const products = await ProductModel.find({
            _id: { $in: productIds },
            isActive: true,
        }).lean<ProductDoc[]>();

        const byId = new Map<string, ProductDTO>(
            products.map((product) => [String(product._id), toProductDTO(product)]),
        );

        return productIds.map((id) => byId.get(id)).filter(isProductDTO);
    }
}
