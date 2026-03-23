import type { ID } from "@shared/primitives";
import type { BannerPlacement, BannerVariant } from "@shared/domain/banner";

export type BannerDTO = {
    id: ID;
    placement: BannerPlacement;
    variant: BannerVariant;
    image: string;
    link?: string;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
};
