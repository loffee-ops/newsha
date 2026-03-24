import mongoose, { InferSchemaType } from "mongoose";

export const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        nameEn: { type: String, default: "" },
        nameUa: { type: String, default: "" },
        slug: { type: String, required: true, unique: true },
        image: { type: String, default: "" },
        description: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);

CategorySchema.index({ isActive: 1, name: 1 });
CategorySchema.index({ createdAt: -1 });

export const CategoryModel = mongoose.model("Category", CategorySchema);

export type CategoryDoc = InferSchemaType<typeof CategorySchema> & {
    _id: mongoose.Types.ObjectId;
};
