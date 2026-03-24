import { ProductModel, type ProductDoc } from "@/models/product.model";
import { ProductSearchModel } from "@/models/product-search.model";

function buildSearchText(product: ProductDoc): string {
    return [
        product.name,
        product.nameEn,
        product.nameUa,
        product.slug,
        product.code,
        ...(product.tags ?? []),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

async function upsertProductIndex(product: ProductDoc): Promise<void> {
    const productId = product._id.toString();

    await ProductSearchModel.updateOne(
        { productId },
        {
            $set: {
                productId,
                name: product.name,
                slug: product.slug,
                isActive: product.isActive,
                text: buildSearchText(product),
            },
        },
        { upsert: true },
    );
}

export async function indexProduct(productId: string): Promise<void> {
    const product = await ProductModel.findById(productId).lean<ProductDoc | null>();

    if (!product) {
        return;
    }

    await upsertProductIndex(product);
}

export async function removeProductFromIndex(productId: string): Promise<void> {
    await ProductSearchModel.deleteOne({ productId });
}

export async function reindexAllProducts(): Promise<void> {
    const cursor = ProductModel.find().lean<ProductDoc>().cursor();

    for await (const product of cursor) {
        await upsertProductIndex(product);
    }
}
