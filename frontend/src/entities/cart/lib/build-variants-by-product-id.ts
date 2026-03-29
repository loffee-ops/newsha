import type { ID } from "@shared/primitives";
import type {
    ProductVolumeOption,
    StoreProduct,
    StoreProductPreview,
} from "@/entities/product/types";

import type { CartVariantMeta, CartVariantMetaMap } from "@/entities/cart/mappers";

type ProductWithVariants = Pick<StoreProductPreview | StoreProduct, "id" | "volumes">;

function toVariantMeta(volume: ProductVolumeOption): CartVariantMeta {
    return {
        value: volume.value,
        label: volume.label,
        unit: volume.unit,
        price: volume.price,
        ...(volume.oldPrice !== undefined ? { oldPrice: volume.oldPrice } : {}),
    };
}

export function buildVariantsByProductId(
    products: readonly ProductWithVariants[],
): CartVariantMetaMap {
    return products.reduce<CartVariantMetaMap>((acc, product) => {
        const variants = product.volumes?.map(toVariantMeta) ?? [];
        acc[product.id as ID] = variants;
        return acc;
    }, {} as CartVariantMetaMap);
}
