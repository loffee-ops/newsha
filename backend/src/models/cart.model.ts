import mongoose, { InferSchemaType } from "mongoose";

import { ProductVolume } from "@shared/domain/product";

const PRODUCT_VOLUME_VALUES = Object.values(ProductVolume).filter(
    (v): v is number => typeof v === "number",
);

const CartRowSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        volume: {
            type: Number,
            enum: PRODUCT_VOLUME_VALUES,
            default: null,
        },
        qty: { type: Number, required: true, min: 1 },
        priceSnapshot: {
            price: { type: Number, required: true },
            oldPrice: { type: Number, default: null },
        },
    },
    { _id: false },
);

export const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        items: { type: [CartRowSchema], default: [] },
    },
    { timestamps: true },
);

CartSchema.index({ userId: 1 }, { unique: true });
CartSchema.index({ updatedAt: -1 });

export type CartItemDB = {
    productId: string;
    volume: ProductVolume | null;
    qty: number;
    priceSnapshot: {
        price: number;
        oldPrice: number | null;
    };
};

export type CartDoc = InferSchemaType<typeof CartSchema> & {
    _id: mongoose.Types.ObjectId;
    items: CartItemDB[];
    createdAt: Date;
    updatedAt: Date;
};

export const CartModel = mongoose.model<CartDoc>("Cart", CartSchema);
