import mongoose, { InferSchemaType, type HydratedDocument, type Model } from "mongoose";

import { ANALYTICS_EVENT_VALUES } from "@shared/domain/analytics";

const CheckoutItemSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        value: { type: Number, required: true },
    },
    { _id: false },
);

const AnalyticsErrorSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        name: { type: String, required: false },
        stack: { type: String, required: false },
    },
    { _id: false },
);

const UTMSchema = new mongoose.Schema(
    {
        source: { type: String, required: false },
        medium: { type: String, required: false },
        campaign: { type: String, required: false },
    },
    { _id: false },
);

export const AnalyticsEventSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ANALYTICS_EVENT_VALUES,
        },
        userId: { type: String, required: false },
        sessionId: { type: String, required: false },

        path: { type: String, required: false },
        productId: { type: String, required: false },
        orderId: { type: String, required: false },
        query: { type: String, required: false },
        name: { type: String, required: false },

        price: { type: Number, required: false },
        qty: { type: Number, required: false },
        value: { type: Number, required: false },
        total: { type: Number, required: false },
        totalQty: { type: Number, required: false },
        totalPrice: { type: Number, required: false },
        duration: { type: Number, required: false },

        items: {
            type: [CheckoutItemSchema],
            default: [],
        },

        error: {
            type: AnalyticsErrorSchema,
            required: false,
        },

        utm: {
            type: UTMSchema,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

AnalyticsEventSchema.index({ createdAt: -1 });
AnalyticsEventSchema.index({ type: 1, createdAt: -1 });
AnalyticsEventSchema.index({ userId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ sessionId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ productId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ orderId: 1, createdAt: -1 });

export type AnalyticsEventRaw = InferSchemaType<typeof AnalyticsEventSchema>;
export type AnalyticsEventDoc = HydratedDocument<AnalyticsEventRaw>;

export const AnalyticsEventModel: Model<AnalyticsEventRaw> =
    mongoose.models.AnalyticsEvent ||
    mongoose.model<AnalyticsEventRaw>("AnalyticsEvent", AnalyticsEventSchema);
