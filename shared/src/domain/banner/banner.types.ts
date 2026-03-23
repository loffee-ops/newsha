import type { ID, ISODate } from "@shared/primitives";

export type BannerPlacement =
    | "home-hero"
    | "home-promo"
    | "catalog-top"
    | "sale-page"
    | "checkout-warning";

export type BannerVariant = "hero" | "promo" | "inline" | "warning" | "info" | "cta";

export type BannerEntity = {
    id: ID;
    placement: BannerPlacement;
    variant: BannerVariant;
    image: string;
    order: number;
    link?: string;
    isActive: boolean;
    startsAt?: ISODate;
    endsAt?: ISODate;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
};
