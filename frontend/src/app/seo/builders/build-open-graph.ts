import type { SeoMeta, OpenGraphMeta } from "@/app/seo/types";

export const buildOpenGraph = (meta: SeoMeta, origin: string): OpenGraphMeta => ({
    title: meta.title,
    description: meta.description,
    url: meta.canonical || origin,
    ...(meta.image && { image: meta.image }),
});
