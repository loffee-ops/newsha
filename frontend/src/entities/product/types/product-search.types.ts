import { ProductVolumeOption } from "./product.types";

import { ID, Money, Slug } from "@shared/primitives";

export type SearchVariationResult = {
    id: string;
    productId: ID;
    slug: Slug;
    nameEn: string;
    nameUa: string;
    image: string;
    volume: ProductVolumeOption;
    price: Money;
    oldPrice?: Money;
    isInStock: boolean;
};
