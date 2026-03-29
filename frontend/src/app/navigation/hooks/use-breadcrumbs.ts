import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

import { buildBreadcrumbs } from "@/app/navigation/lib";
import { buildBreadcrumbsSchema } from "@shared/domain/breadcrumb";

import type { BreadcrumbCategory, BreadcrumbProduct } from "@shared/domain/breadcrumb";

type UseBreadcrumbsParams = {
    product?: BreadcrumbProduct;
    category?: BreadcrumbCategory;
};

export function useBreadcrumbs({ product, category }: UseBreadcrumbsParams = {}) {
    const { pathname } = useLocation();
    const { slug, categorySlug } = useParams<{
        slug?: string;
        categorySlug?: string;
    }>();

    const breadcrumbs = useMemo(() => {
        const routeParams = {
            ...(slug !== undefined ? { slug } : {}),
            ...(categorySlug !== undefined ? { categorySlug } : {}),
        };

        return buildBreadcrumbs({
            pathname,
            ...(Object.keys(routeParams).length > 0 ? { params: routeParams } : {}),
            ...(product !== undefined ? { product } : {}),
            ...(category !== undefined ? { category } : {}),
        });
    }, [pathname, slug, categorySlug, product, category]);

    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const schema = useMemo(() => {
        return buildBreadcrumbsSchema(breadcrumbs, origin);
    }, [breadcrumbs, origin]);

    return { breadcrumbs, schema };
}
