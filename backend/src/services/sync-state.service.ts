import { SyncStateModel, type SyncStateDoc } from "@/models/sync-state.model";
import { SYNC_STATUSES } from "@shared/domain/sync";
import type { SyncEntity, SyncSource } from "@shared/domain/sync";

type SyncKey = {
    source: SyncSource;
    entity: SyncEntity;
};

type SyncStatsInput = {
    processed?: number;
    created?: number;
    updated?: number;
    deleted?: number;
};

type MarkErrorInput = SyncKey & {
    errorMessage: string;
};

type MarkSuccessInput = SyncKey & {
    externalCursor?: string;
    externalUpdatedAt?: Date;
    stats?: SyncStatsInput;
};

type MarkRunningInput = SyncKey & {
    externalCursor?: string;
    externalUpdatedAt?: Date;
};

function normalizeStats(stats?: SyncStatsInput) {
    return {
        processed: stats?.processed ?? 0,
        created: stats?.created ?? 0,
        updated: stats?.updated ?? 0,
        deleted: stats?.deleted ?? 0,
    };
}

export class SyncStateService {
    async getOrCreate(key: SyncKey): Promise<SyncStateDoc> {
        const doc = await SyncStateModel.findOneAndUpdate(
            {
                source: key.source,
                entity: key.entity,
            },
            {
                $setOnInsert: {
                    source: key.source,
                    entity: key.entity,
                    status: SYNC_STATUSES.Idle,
                    stats: normalizeStats(),
                },
            },
            {
                new: true,
                upsert: true,
            },
        ).exec();

        return doc;
    }

    async get(key: SyncKey): Promise<SyncStateDoc | null> {
        return SyncStateModel.findOne({
            source: key.source,
            entity: key.entity,
        }).exec();
    }

    async markRunning(input: MarkRunningInput): Promise<SyncStateDoc> {
        const doc = await SyncStateModel.findOneAndUpdate(
            {
                source: input.source,
                entity: input.entity,
            },
            {
                $set: {
                    status: SYNC_STATUSES.Running,
                    lastSyncAt: new Date(),
                    ...(input.externalCursor !== undefined
                        ? { externalCursor: input.externalCursor }
                        : {}),
                    ...(input.externalUpdatedAt !== undefined
                        ? { externalUpdatedAt: input.externalUpdatedAt }
                        : {}),
                },
                $setOnInsert: {
                    source: input.source,
                    entity: input.entity,
                    stats: normalizeStats(),
                },
            },
            {
                new: true,
                upsert: true,
            },
        ).exec();

        return doc;
    }

    async markSuccess(input: MarkSuccessInput): Promise<SyncStateDoc> {
        const doc = await SyncStateModel.findOneAndUpdate(
            {
                source: input.source,
                entity: input.entity,
            },
            {
                $set: {
                    status: SYNC_STATUSES.Success,
                    lastSyncAt: new Date(),
                    lastSuccessAt: new Date(),
                    lastErrorMessage: "",
                    stats: normalizeStats(input.stats),
                    ...(input.externalCursor !== undefined
                        ? { externalCursor: input.externalCursor }
                        : {}),
                    ...(input.externalUpdatedAt !== undefined
                        ? { externalUpdatedAt: input.externalUpdatedAt }
                        : {}),
                },
                $setOnInsert: {
                    source: input.source,
                    entity: input.entity,
                },
            },
            {
                new: true,
                upsert: true,
            },
        ).exec();

        return doc;
    }

    async markError(input: MarkErrorInput): Promise<SyncStateDoc> {
        const doc = await SyncStateModel.findOneAndUpdate(
            {
                source: input.source,
                entity: input.entity,
            },
            {
                $set: {
                    status: SYNC_STATUSES.Error,
                    lastSyncAt: new Date(),
                    lastErrorAt: new Date(),
                    lastErrorMessage: input.errorMessage,
                },
                $setOnInsert: {
                    source: input.source,
                    entity: input.entity,
                    stats: normalizeStats(),
                },
            },
            {
                new: true,
                upsert: true,
            },
        ).exec();

        return doc;
    }

    async reset(key: SyncKey): Promise<SyncStateDoc> {
        const doc = await SyncStateModel.findOneAndUpdate(
            {
                source: key.source,
                entity: key.entity,
            },
            {
                $set: {
                    status: SYNC_STATUSES.Idle,
                    lastErrorMessage: "",
                    stats: normalizeStats(),
                    externalCursor: "",
                    externalUpdatedAt: null,
                },
                $setOnInsert: {
                    source: key.source,
                    entity: key.entity,
                },
            },
            {
                new: true,
                upsert: true,
            },
        ).exec();

        return doc;
    }
}
