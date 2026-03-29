import type { Product } from "@/entities/product/types";

import type { SeoMeta } from "@/app/seo/types";
import { PRODUCT_SEO_TEXT } from "@/app/seo/config";

export const buildProductSeo = (product: Product): SeoMeta => ({
    title: `${product.name} ${PRODUCT_SEO_TEXT.titleSuffix}`,
    description:
        product.shortDescription ??
        product.description.slice(0, PRODUCT_SEO_TEXT.descriptionMaxLength),
    canonical: `${PRODUCT_SEO_TEXT.canonicalBase}/${product.slug}`,
    ...(product.image && { image: product.image }),
});
