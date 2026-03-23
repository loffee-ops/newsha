import type { Breadcrumb } from "./breadcrumb.types";

function joinUrl(origin: string, href: string): string {
    return `${origin.replace(/\/$/, "")}${href}`;
}

export function buildBreadcrumbsSchema(breadcrumbs: Breadcrumb, origin: string) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.items
            .filter((item) => !item.hidden)
            .map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.label,
                ...(item.href ? { item: joinUrl(origin, item.href) } : {}),
            })),
    };
}
