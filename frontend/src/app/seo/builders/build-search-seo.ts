import type { SeoMeta } from "@/app/seo/types";
import { SEARCH_SEO_TEXT } from "@/app/seo/config";

export const buildSearchSeo = (query: string): SeoMeta => ({
    title: SEARCH_SEO_TEXT.titleTemplate(query),
    description: SEARCH_SEO_TEXT.descriptionTemplate(query),
    canonical: `${SEARCH_SEO_TEXT.canonicalBase}?q=${encodeURIComponent(query)}`,
});
