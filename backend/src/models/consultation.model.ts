import mongoose, { InferSchemaType } from "mongoose";

export const CONSULTATION_STATUS = {
    New: "new",
    InProgress: "in_progress",
    Resolved: "resolved",
    Cancelled: "cancelled",
} as const;

export type ConsultationStatus = (typeof CONSULTATION_STATUS)[keyof typeof CONSULTATION_STATUS];

export const ConsultationSchema = new mongoose.Schema(
    {
        userId: { type: String },
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        message: { type: String, default: "" },
        source: { type: String, default: "site" },
        status: {
            type: String,
            enum: Object.values(CONSULTATION_STATUS),
            default: CONSULTATION_STATUS.New,
        },
    },
    { timestamps: true },
);

ConsultationSchema.index({ status: 1, createdAt: -1 });
ConsultationSchema.index({ userId: 1, createdAt: -1 });
ConsultationSchema.index({ createdAt: -1 });

export const ConsultationModel = mongoose.model("Consultation", ConsultationSchema);

export type ConsultationDoc = InferSchemaType<typeof ConsultationSchema> & {
    _id: mongoose.Types.ObjectId;
};
