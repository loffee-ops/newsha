import mongoose, { InferSchemaType } from "mongoose";

export const SessionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },

        refreshTokenHash: {
            type: String,
            required: true,
            trim: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        revokedAt: {
            type: Date,
            required: false,
            default: null,
        },

        replacedBySessionId: {
            type: String,
            required: false,
            default: null,
            trim: true,
        },

        lastUsedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },

        userAgent: {
            type: String,
            required: false,
            default: null,
            trim: true,
        },

        ip: {
            type: String,
            required: false,
            default: null,
            trim: true,
        },
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

SessionSchema.index({ userId: 1, createdAt: -1 });
SessionSchema.index({ userId: 1, revokedAt: 1 });
SessionSchema.index({ expiresAt: 1 });

export type SessionSchemaFields = InferSchemaType<typeof SessionSchema>;
export type SessionDoc = mongoose.HydratedDocument<SessionSchemaFields>;
export type SessionDB = SessionSchemaFields & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const SessionModel = mongoose.model<SessionSchemaFields>("Session", SessionSchema);
