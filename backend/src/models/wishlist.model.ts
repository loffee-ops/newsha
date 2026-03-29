import mongoose, { InferSchemaType } from "mongoose";

const WishlistItemSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        addedAt: { type: Date, required: true },
    },
    { _id: false },
);

export const WishlistSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        items: { type: [WishlistItemSchema], default: [] },
    },
    { timestamps: true },
);

WishlistSchema.index({ userId: 1 }, { unique: true });
WishlistSchema.index({ updatedAt: -1 });

export type WishlistDBItem = {
    productId: string;
    addedAt: Date;
};

export type WishlistDB = InferSchemaType<typeof WishlistSchema> & {
    _id: mongoose.Types.ObjectId;
    items: WishlistDBItem[];
    createdAt: Date;
    updatedAt: Date;
};

export const WishlistModel = mongoose.model<WishlistDB>("Wishlist", WishlistSchema);
