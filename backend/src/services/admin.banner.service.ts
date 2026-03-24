import type { Request } from "express";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

import type { BannerPlacement, BannerVariant } from "@shared/domain/banner";

import { BannerErrors } from "@/errors";
import cloudinary from "@/infrastructure/cloudinary/cloudinary.client";
import { paginate } from "@/lib/db";
import { BannerModel } from "@/models/banner.model";

export type UploadBannerAdminParams = {
    fileBuffer?: Buffer;
    input: {
        placement: BannerPlacement;
        variant?: BannerVariant;
        link?: string;
        alt?: string;
        title?: string;
        subTitle?: string;
        buttonText?: string;
        startsAt?: Date | string | null;
        endsAt?: Date | string | null;
    };
};

export type UpdateBannerAdminInput = {
    id: string;
    placement?: BannerPlacement;
    variant?: BannerVariant;
    link?: string | null;
    alt?: string | null;
    title?: string | null;
    subTitle?: string | null;
    buttonText?: string | null;
    isActive?: boolean;
    order?: number;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
};

function extractCloudinaryPublicId(url: string): string | null {
    if (!url || !url.includes("/upload/")) {
        return null;
    }

    const marker = "/upload/";
    const uploadIndex = url.indexOf(marker);

    if (uploadIndex === -1) {
        return null;
    }

    let path = url.slice(uploadIndex + marker.length);

    const queryIndex = path.indexOf("?");
    if (queryIndex !== -1) {
        path = path.slice(0, queryIndex);
    }

    const parts = path.split("/").filter(Boolean);

    if (parts.length === 0) {
        return null;
    }

    const restParts = parts[0]?.startsWith("v") ? parts.slice(1) : parts;
    const pathWithExt = restParts.join("/");

    if (!pathWithExt) {
        return null;
    }

    return pathWithExt.replace(/\.[a-z0-9]+$/i, "");
}

async function uploadBannerImage(fileBuffer: Buffer): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "newsha/banners",
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error || !result) {
                    reject(BannerErrors.uploadFailed());
                    return;
                }

                resolve(result);
            },
        );

        stream.end(fileBuffer);
    });
}

async function deleteBannerImage(imageUrl?: string | null): Promise<void> {
    if (!imageUrl) {
        return;
    }

    const publicId = extractCloudinaryPublicId(imageUrl);

    if (!publicId) {
        return;
    }

    try {
        await cloudinary.uploader.destroy(publicId);
    } catch {
        // ignore cloudinary delete errors
    }
}

export async function getAllBannersAdmin(req: Request) {
    return paginate(BannerModel, {}, req, {
        sort: { placement: 1, order: 1, createdAt: -1 },
    });
}

export async function uploadBannerAdmin({ fileBuffer, input }: UploadBannerAdminParams) {
    if (!fileBuffer) {
        throw BannerErrors.fileRequired();
    }

    const uploadResult = await uploadBannerImage(fileBuffer);

    const banner = await BannerModel.create({
        placement: input.placement,
        variant: input.variant ?? "promo",
        image: uploadResult.secure_url,
        link: input.link,
        alt: input.alt,
        title: input.title,
        subTitle: input.subTitle,
        buttonText: input.buttonText,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
        isActive: true,
        order: 0,
    });

    return banner;
}

export async function updateBannerAdmin(input: UpdateBannerAdminInput) {
    const update: Record<string, unknown> = {};

    if (input.placement !== undefined) update.placement = input.placement;
    if (input.variant !== undefined) update.variant = input.variant;
    if (input.link !== undefined) update.link = input.link;
    if (input.alt !== undefined) update.alt = input.alt;
    if (input.title !== undefined) update.title = input.title;
    if (input.subTitle !== undefined) update.subTitle = input.subTitle;
    if (input.buttonText !== undefined) update.buttonText = input.buttonText;
    if (input.isActive !== undefined) update.isActive = input.isActive;
    if (input.order !== undefined) update.order = input.order;
    if (input.startsAt !== undefined) update.startsAt = input.startsAt;
    if (input.endsAt !== undefined) update.endsAt = input.endsAt;

    const doc = await BannerModel.findByIdAndUpdate(
        input.id,
        { $set: update },
        { new: true, runValidators: true },
    );

    if (!doc) {
        throw BannerErrors.notFound();
    }

    return doc;
}

export async function deleteBannerAdmin(id: string) {
    const doc = await BannerModel.findById(id);

    if (!doc) {
        throw BannerErrors.notFound();
    }

    await deleteBannerImage(String(doc.image || ""));

    await doc.deleteOne();
}
