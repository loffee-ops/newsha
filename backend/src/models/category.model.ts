import mongoose, { InferSchemaType, type HydratedDocument, type Model, type Types } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        nameEn: { type: String, default: "", trim: true },
        nameUa: { type: String, default: "", trim: true },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        image: { type: String, default: null },
        description: { type: String, default: null },

        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
            index: true,
        },

        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0, index: true },
        showOnHome: { type: Boolean, default: false },

        externalId: { type: String, default: null, index: true },
        externalSource: { type: String, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

categorySchema.index({ isActive: 1, parentId: 1, order: 1 });
categorySchema.index({ createdAt: -1 });

export type CategorySchemaType = InferSchemaType<typeof categorySchema>;

export type CategoryDoc = HydratedDocument<CategorySchemaType>;

export type CategoryLean = CategorySchemaType & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const CategoryModel: Model<CategorySchemaType> = mongoose.model<CategorySchemaType>(
    "Category",
    categorySchema,
);
