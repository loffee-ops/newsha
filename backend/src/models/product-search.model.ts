import mongoose, { InferSchemaType } from "mongoose";

export const ProductSearchSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        text: { type: String, required: true },
    },
    { timestamps: true },
);

ProductSearchSchema.index({ text: "text" });

export const ProductSearchModel = mongoose.model("ProductSearch", ProductSearchSchema);

export type ProductSearchDoc = InferSchemaType<typeof ProductSearchSchema> & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
