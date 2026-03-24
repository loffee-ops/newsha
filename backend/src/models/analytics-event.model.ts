import mongoose, { InferSchemaType } from "mongoose";

export const AnalyticsEventSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
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
        items: { type: Array, default: [] },
        error: { type: mongoose.Schema.Types.Mixed, required: false },
        utm: {
            source: { type: String, required: false },
            medium: { type: String, required: false },
            campaign: { type: String, required: false },
        },
    },
    { timestamps: true },
);

AnalyticsEventSchema.index({ createdAt: -1 });
AnalyticsEventSchema.index({ type: 1, createdAt: -1 });
AnalyticsEventSchema.index({ userId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ sessionId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ productId: 1, createdAt: -1 });
AnalyticsEventSchema.index({ orderId: 1, createdAt: -1 });

export const AnalyticsEventModel = mongoose.model("AnalyticsEvent", AnalyticsEventSchema);

export type AnalyticsEventDoc = InferSchemaType<typeof AnalyticsEventSchema> & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
