export type SEO = {
    title?: string;
    description?: string;
    keywords?: readonly string[];
    ogImage?: string;
};

export type SeoMeta = {
    title: string;
    description: string;
    canonical: string;
    image?: string;
    noIndex?: boolean;
};

export type OpenGraphMeta = {
    title: string;
    description: string;
    url: string;
    image?: string;
};
