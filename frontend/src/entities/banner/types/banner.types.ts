import type { ID, ISODate, Slug } from "@shared/primitives";
import type { BannerDTO, DeleteBannerDTO } from "@shared/contracts/banner";
import type { BannerPlacement, BannerVariant } from "@shared/domain/banner";

export type AdminBannerResponse = {
    _id: string;
    placement: BannerPlacement;
    variant: BannerVariant;
    image: string;
    order: number;
    link?: string | null;
    isActive: boolean;
    startsAt?: string | null;
    endsAt?: string | null;
    alt?: string | null;
    title?: string | null;
    subTitle?: string | null;
    buttonText?: string | null;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

export type AdminBannerListResponse = {
    items: AdminBannerResponse[];
    total: number;
    page: number;
    limit: number;
    pages: number;
};

export type PublicBanner = BannerDTO;

export type UploadBannerPayload = {
    file: File;
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

export type UpdateBannerPayload = {
    id: ID;
    placement?: BannerPlacement;
    variant?: BannerVariant;
    link?: Slug | null;
    alt?: string | null;
    title?: string | null;
    subTitle?: string | null;
    buttonText?: string | null;
    isActive?: boolean;
    order?: number;
    startsAt?: ISODate | null;
    endsAt?: ISODate | null;
};

export type DeleteBannerPayload = DeleteBannerDTO;
