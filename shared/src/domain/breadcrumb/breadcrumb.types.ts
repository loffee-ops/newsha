import type { ID, Slug } from "@shared/primitives";

export type BreadcrumbLinkType = "internal" | "external" | "anchor";

export type BreadcrumbKind = "home" | "catalog" | "category" | "product" | "custom";

export type BreadcrumbSchemaMeta = {
    position?: number;
    itemId?: string;
    url?: string;
};

export type BreadcrumbMeta = {
    analyticsId?: string;
    testId?: string;
};

type BaseBreadcrumbItem = {
    label: string;
    kind: BreadcrumbKind;
    hidden?: boolean;
    iconName?: string;
    meta?: BreadcrumbMeta;
    schema?: BreadcrumbSchemaMeta;
};

export type BreadcrumbLinkItem = BaseBreadcrumbItem & {
    href: string;
    linkType?: BreadcrumbLinkType;
    isActive?: false;
};

export type BreadcrumbCurrentItem = BaseBreadcrumbItem & {
    href?: undefined;
    linkType?: undefined;
    isActive: true;
};

export type BreadcrumbItem = BreadcrumbLinkItem | BreadcrumbCurrentItem;

export type Breadcrumb = {
    items: readonly BreadcrumbItem[];
    enableSchema?: boolean;
};

export type BreadcrumbCategory = {
    id: ID;
    name: string;
    slug: Slug;
};

export type BreadcrumbProduct = {
    id: ID;
    name: string;
    slug: Slug;
};

export type BuildBreadcrumbsParams = {
    pathname: string;
    params?: {
        slug?: string;
        categorySlug?: string;
    };
    category?: BreadcrumbCategory;
    product?: BreadcrumbProduct;
};
