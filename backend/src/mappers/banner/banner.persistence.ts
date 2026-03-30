import type { Types } from "mongoose";

import type { BannerPlacement, BannerVariant } from "@shared/domain/banner";

export type BannerPersistence = {
    _id: Types.ObjectId;
    placement: BannerPlacement;
    variant: BannerVariant;
    image: string;
    order: number;
    link?: string | null;
    isActive: boolean;
    startsAt?: Date | null;
    endsAt?: Date | null;
    alt?: string | null;
    title?: string | null;
    subTitle?: string | null;
    buttonText?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
};
