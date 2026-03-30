import type {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbKind,
    BuildBreadcrumbsParams,
} from "@shared/domain/breadcrumb";

import { ROUTES, NAV_PAGE_LABELS } from "@/app/navigation/config";
import { isNavPagePath } from "@/app/navigation/lib";

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
            return { items };
        }

        pushLink(items, NAV_PAGE_LABELS[ROUTES.CATALOG], ROUTES.CATALOG, "catalog");
    }

    if (category) {
        const categoryHref = ROUTES.CATEGORY(category.slug);

        if (pathname === categoryHref) {
            pushCurrent(items, category.name, "category");
            return { items };
        }

        pushLink(items, category.name, categoryHref, "category");
    }

    if (product) {
        pushCurrent(items, product.name, "product");
    }

    return { items };
}
