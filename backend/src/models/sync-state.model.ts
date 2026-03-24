import mongoose, { InferSchemaType } from "mongoose";
import { SYNC_ENTITIES, SYNC_SOURCES, SYNC_STATUSES } from "@shared/domain/sync";

export const SyncStateSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            enum: Object.values(SYNC_SOURCES),
            required: true,
        },

        entity: {
            type: String,
            enum: Object.values(SYNC_ENTITIES),
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(SYNC_STATUSES),
            default: SYNC_STATUSES.Idle,
        },

        lastSyncAt: Date,
        lastSuccessAt: Date,
        lastErrorAt: Date,
        lastErrorMessage: String,
        externalCursor: String,
        externalUpdatedAt: Date,
        stats: {
            processed: { type: Number, default: 0 },
            created: { type: Number, default: 0 },
            updated: { type: Number, default: 0 },
            deleted: { type: Number, default: 0 },
        },
    },
    { timestamps: true },
);

SyncStateSchema.index({ source: 1, entity: 1 }, { unique: true });

export const SyncStateModel = mongoose.model("SyncState", SyncStateSchema);

export type SyncStateDoc = InferSchemaType<typeof SyncStateSchema> & {
    _id: mongoose.Types.ObjectId;
};
