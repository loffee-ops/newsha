import { isNavPagePath } from "@/app/navigation/lib";
import { NAV_PAGE_LABELS } from "@/app/navigation/config";

import type {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbKind,
    BuildBreadcrumbsParams,
} from "@shared/domain/breadcrumb";

const ROUTES = {
    HOME: "/",
    CATALOG: "/catalog",
    PAGE: "/page",
} as const;

function pushLink(
    items: BreadcrumbItem[],
    label: string,
    href: string,
    kind: BreadcrumbKind,
): void {
    items.push({
        label,
        href,
        kind,
    });
}

function pushCurrent(items: BreadcrumbItem[], label: string, kind: BreadcrumbKind): void {
    items.push({
        label,
        kind,
        isActive: true,
    });
}

export function buildBreadcrumbs({
    pathname,
    params,
    product,
    category,
}: BuildBreadcrumbsParams): Breadcrumb {
    const items: BreadcrumbItem[] = [];

    pushLink(items, NAV_PAGE_LABELS[ROUTES.HOME], ROUTES.HOME, "home");

    if (isNavPagePath(pathname) && pathname !== ROUTES.HOME) {
        pushCurrent(items, NAV_PAGE_LABELS[pathname], "custom");
        return { items };
    }

    if (pathname.startsWith(ROUTES.CATALOG)) {
        if (pathname === ROUTES.CATALOG) {
            pushCurrent(items, NAV_PAGE_LABELS[ROUTES.CATALOG], "catalog");
        } else {
            pushLink(items, NAV_PAGE_LABELS[ROUTES.CATALOG], ROUTES.CATALOG, "catalog");
        }
    }

    if (category) {
        const categoryHref = `${ROUTES.CATALOG}/${category.slug}`;

        if (pathname === categoryHref) {
            pushCurrent(items, category.name, "category");
        } else {
            pushLink(items, category.name, categoryHref, "category");
        }
    }

    if (product) {
        pushCurrent(items, product.name, "product");
    }

    if (pathname.startsWith(ROUTES.PAGE) && params?.slug) {
        pushCurrent(items, params.slug.replace(/-/g, " "), "custom");
    }

    return { items };
}
