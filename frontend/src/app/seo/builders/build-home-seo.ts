import type { SeoMeta } from "@/app/seo/types";
import { HOME_SEO_TEXT } from "@/app/seo/config";

export const buildHomeSeo = (): SeoMeta => ({
    title: HOME_SEO_TEXT.title,
    description: HOME_SEO_TEXT.description,
    canonical: HOME_SEO_TEXT.canonical,
});
