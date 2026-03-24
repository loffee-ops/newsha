import type { BannerPlacement, BannerEntity } from "@shared/domain/banner";

import { toBannerEntity } from "@/mappers/banner";
import type { BannerPersistence } from "@/mappers/banner";
import { BannerModel } from "@/models/banner.model";

export async function findActiveBannersByPlacement(
    placement: BannerPlacement,
): Promise<BannerEntity[]> {
    const now = new Date();

    const docs = await BannerModel.find({
        placement,
        isActive: true,
        $and: [
            {
                $or: [
                    { startsAt: null },
                    { startsAt: { $exists: false } },
                    { startsAt: { $lte: now } },
                ],
            },
            {
                $or: [{ endsAt: null }, { endsAt: { $exists: false } }, { endsAt: { $gte: now } }],
            },
        ],
    })
        .sort({ order: 1, createdAt: -1 })
        .lean<BannerPersistence[]>();

    return docs.map(toBannerEntity);
}
