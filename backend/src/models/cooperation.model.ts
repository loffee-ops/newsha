import mongoose, { InferSchemaType } from "mongoose";

import type { CooperationStatus } from "@shared/domain/cooperation";
import { COOPERATION_STATUSES } from "@shared/domain/cooperation";

export { COOPERATION_STATUSES };
export type { CooperationStatus };

export const CooperationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        message: { type: String, default: "", trim: true },
        status: {
            type: String,
            enum: Object.values(COOPERATION_STATUSES),
            default: COOPERATION_STATUSES.New,
            required: true,
        },
    },
    { timestamps: true },
);

CooperationSchema.index({ status: 1, createdAt: -1 });
CooperationSchema.index({ createdAt: -1 });

export const CooperationModel = mongoose.model("Cooperation", CooperationSchema);

export type CooperationDoc = InferSchemaType<typeof CooperationSchema> & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
