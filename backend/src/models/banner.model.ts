import mongoose from "mongoose";

import { BANNER_PLACEMENTS, BANNER_VARIANTS } from "@shared/domain/banner";

const BannerSchema = new mongoose.Schema(
    {
        placement: {
            type: String,
            required: true,
            enum: BANNER_PLACEMENTS,
        },
        variant: {
            type: String,
            required: true,
            enum: BANNER_VARIANTS,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: false,
            trim: true,
        },
        alt: {
            type: String,
            required: false,
            trim: true,
        },
        title: {
            type: String,
            required: false,
            trim: true,
        },
        subTitle: {
            type: String,
            required: false,
            trim: true,
        },
        buttonText: {
            type: String,
            required: false,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
            min: 0,
        },
        startsAt: {
            type: Date,
            required: false,
            default: null,
        },
        endsAt: {
            type: Date,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret: Record<string, unknown>) => {
                ret.id = String(ret._id);
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (_doc, ret: Record<string, unknown>) => {
                ret.id = String(ret._id);
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    },
);

BannerSchema.index({ placement: 1, isActive: 1, order: 1 });
BannerSchema.index({ placement: 1, order: 1, createdAt: -1 });
BannerSchema.index({ isActive: 1, createdAt: -1 });
BannerSchema.index({ startsAt: 1, endsAt: 1, isActive: 1 });

BannerSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const BannerModel = mongoose.model("Banner", BannerSchema);
