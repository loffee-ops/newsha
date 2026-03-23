import type { BannerPlacement, BannerVariant } from "./banner.types";

export const BANNER_PLACEMENTS = [
    "home-hero",
    "home-promo",
    "catalog-top",
    "sale-page",
    "checkout-warning",
] as const satisfies readonly BannerPlacement[];

export const BANNER_VARIANTS = [
    "hero",
    "promo",
    "inline",
    "warning",
    "info",
    "cta",
] as const satisfies readonly BannerVariant[];
