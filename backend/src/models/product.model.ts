import mongoose, { InferSchemaType } from "mongoose";

import { ProductVolume } from "@shared/domain/product";

const PRODUCT_UNITS = ["ml", "g", "pcs"] as const;
const GALLERY_TYPES = ["image", "video"] as const;

const VolumeSchema = new mongoose.Schema(
    {
        value: {
            type: Number,
            enum: Object.values(ProductVolume).filter(
                (value): value is number => typeof value === "number",
            ),
            required: true,
        },
        label: {
            type: String,
            required: true,
            trim: true,
        },
        unit: {
            type: String,
            enum: PRODUCT_UNITS,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        oldPrice: {
            type: Number,
            min: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { _id: false },
);

const GallerySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: GALLERY_TYPES,
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        alt: {
            type: String,
            default: "",
            trim: true,
        },
        isPrimary: {
            type: Boolean,
            default: false,
        },
        urlPreview: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false },
);

export const ProductSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        nameEn: {
            type: String,
            default: "",
            trim: true,
        },
        nameUa: {
            type: String,
            default: "",
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
        },
        categoryId: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: "",
            trim: true,
        },
        gallery: {
            type: [GallerySchema],
            default: [],
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        oldPrice: {
            type: Number,
            min: 0,
        },
        basePrice: {
            type: Number,
            min: 0,
        },
        baseOldPrice: {
            type: Number,
            min: 0,
        },
        volumes: {
            type: [VolumeSchema],
            default: [],
        },
        shortDescription: {
            type: String,
            default: "",
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        howToUse: {
            type: String,
            default: "",
            trim: true,
        },
        effects: {
            type: String,
            default: "",
            trim: true,
        },
        ingredients: {
            type: String,
            default: "",
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        needs: {
            type: [String],
            default: [],
        },
        condition: {
            type: [String],
            default: [],
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        isBestseller: {
            type: Boolean,
            default: false,
        },
        isTop: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        ratingAvg: {
            type: Number,
            default: 0,
            min: 0,
        },
        ratingCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true },
);

ProductSchema.index({ code: 1 }, { unique: true });
ProductSchema.index({ slug: 1 }, { unique: true });

ProductSchema.index({ categoryId: 1, isActive: 1, price: 1 });
ProductSchema.index({ categoryId: 1, isActive: 1, ratingAvg: -1 });
ProductSchema.index({ categoryId: 1, isActive: 1, createdAt: -1 });

ProductSchema.index({ isBestseller: 1, isActive: 1 });
ProductSchema.index({ isTop: 1, isActive: 1 });
ProductSchema.index({ isNewArrival: 1, isActive: 1 });

ProductSchema.index({ categoryId: 1, isActive: 1, tags: 1 });
ProductSchema.index({ categoryId: 1, isActive: 1, needs: 1 });
ProductSchema.index({ categoryId: 1, isActive: 1, condition: 1 });
ProductSchema.index({ categoryId: 1, isActive: 1, "volumes.value": 1 });

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ ratingAvg: -1, isActive: 1 });

ProductSchema.index(
    { name: "text", nameEn: "text", nameUa: "text" },
    { weights: { name: 5, nameUa: 4, nameEn: 3 } },
);

export const ProductModel = mongoose.model("Product", ProductSchema);

export type ProductDoc = InferSchemaType<typeof ProductSchema> & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
