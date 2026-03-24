import mongoose, { InferSchemaType } from "mongoose";

import { REVIEW_STATUS } from "@shared/domain/review";

const ReviewSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        userId: { type: String, required: true },
        userName: { type: String, required: true, trim: true },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        text: { type: String, default: "" },
        photos: { type: [String], default: [] },
        status: {
            type: String,
            enum: Object.values(REVIEW_STATUS),
            default: REVIEW_STATUS.Pending,
            required: true,
        },
    },
    { timestamps: true },
);

ReviewSchema.index({ productId: 1, status: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1, createdAt: -1 });
ReviewSchema.index({ status: 1, createdAt: -1 });
ReviewSchema.index({ productId: 1, rating: 1 });
ReviewSchema.index({ createdAt: -1 });

export const ReviewModel = mongoose.model("Review", ReviewSchema);

export type ReviewDoc = InferSchemaType<typeof ReviewSchema> & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
