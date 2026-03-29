import type { ID } from "@shared/primitives";
import type { BannerPlacement, BannerVariant } from "@shared/domain/banner";
import type { ISODate, Slug } from "@shared/primitives";
import type { BannerAdminDTO } from "./banner-admin.dto";

export type BannerDTO = {
    id: ID;
    placement: BannerPlacement;
    variant: BannerVariant;
    image: string;
    link?: Slug;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
};

export type CreateBannerDTO = {
    placement: BannerPlacement;
    variant: BannerVariant;
    link?: Slug;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
    startsAt?: ISODate;
    endsAt?: ISODate;
};

export type UpdateBannerDTO = {
    placement?: BannerPlacement;
    variant?: BannerVariant;
    link?: Slug;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
    isActive?: boolean;
    order?: number;
    startsAt?: ISODate;
    endsAt?: ISODate;
};

export type DeleteBannerDTO = {
    id: ID;
};

export type BannerListResponseDTO = {
    items: BannerAdminDTO[];
    total: number;
    page: number;
    limit: number;
    pages: number;
};
