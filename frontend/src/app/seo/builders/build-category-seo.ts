import type { Category } from "@shared/domain/category";

import type { SeoMeta } from "@/app/seo/types";
import { CATEGORY_SEO_TEXT } from "@/app/seo/config";

export const buildCategorySeo = (category: Category): SeoMeta => ({
    title: `${category.name} ${CATEGORY_SEO_TEXT.titleSuffix}`,
    description: category.description ?? CATEGORY_SEO_TEXT.descriptionTemplate(category.name),
    canonical: `${CATEGORY_SEO_TEXT.canonicalBase}/${category.slug}`,
    ...(category.image && { image: category.image }),
});
