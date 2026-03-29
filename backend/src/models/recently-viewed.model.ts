import mongoose, { InferSchemaType } from "mongoose";

const RecentlyViewedSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
        viewedAt: { type: Date, default: Date.now },
    },
    { timestamps: false },
);

RecentlyViewedSchema.index({ userId: 1, productId: 1 }, { unique: true });
RecentlyViewedSchema.index({ userId: 1, viewedAt: -1 });
RecentlyViewedSchema.index({ productId: 1, viewedAt: -1 });
RecentlyViewedSchema.index({ viewedAt: -1 });

export type RecentlyViewedDoc = InferSchemaType<typeof RecentlyViewedSchema> & {
    _id: mongoose.Types.ObjectId;
};

export const RecentlyViewedModel = mongoose.model<RecentlyViewedDoc>(
    "RecentlyViewed",
    RecentlyViewedSchema,
);
