import mongoose, { InferSchemaType } from "mongoose";

import { ORDER_STATUS, DELIVERY_METHOD, PAYMENT_METHOD } from "@shared/domain/order";
import { ProductVolume } from "@shared/domain/product";

const PRODUCT_VOLUME_VALUES = Object.values(ProductVolume).filter(
    (v): v is number => typeof v === "number",
);

const OrderItemSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        volumeValue: {
            type: Number,
            enum: PRODUCT_VOLUME_VALUES,
            required: false,
            default: null,
        },
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false },
);

const DeliverySchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: Object.values(DELIVERY_METHOD),
            required: true,
        },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        middleName: { type: String, required: false, trim: true },
        phone: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        warehouse: { type: String, required: false, trim: true },
        postomat: { type: String, required: false, trim: true },
        address: { type: String, required: false, trim: true },
    },
    { _id: false },
);

const PaymentSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: Object.values(PAYMENT_METHOD),
            required: true,
        },
    },
    { _id: false },
);

export const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, index: true },
        items: {
            type: [OrderItemSchema],
            required: true,
            validate: {
                validator(items: unknown[]) {
                    return Array.isArray(items) && items.length > 0;
                },
                message: "Order must contain at least one item",
            },
        },
        total: { type: Number, required: true, min: 0 },
        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.Pending,
            required: true,
        },
        delivery: { type: DeliverySchema, required: true },
        payment: { type: PaymentSchema, required: true },
        comment: { type: String, required: false, trim: true },
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

OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ "items.productId": 1, createdAt: -1 });

export type OrderSchemaFields = InferSchemaType<typeof OrderSchema>;

export type OrderDoc = mongoose.HydratedDocument<OrderSchemaFields>;

export type OrderDB = OrderSchemaFields & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const OrderModel = mongoose.model<OrderSchemaFields>("Order", OrderSchema);
