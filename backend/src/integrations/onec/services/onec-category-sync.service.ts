import { SYNC_ENTITIES, SYNC_SOURCES } from "@shared/domain/sync";

import { logger } from "@/infrastructure/logger";
import { CategoryModel } from "@/models/category.model";
import { SyncStateService } from "@/services/sync-state.service";
import { OneCClient } from "@/integrations/onec/client";
import { mapOneCCategoryToUpsertInput } from "@/integrations/onec/mappers";

export class OneCCategorySyncService {
    constructor(
        private readonly client = new OneCClient(),
        private readonly syncStateService = new SyncStateService(),
    ) {}

    async syncAll(): Promise<void> {
        const state = await this.syncStateService.get({
            source: SYNC_SOURCES.OneC,
            entity: SYNC_ENTITIES.Category,
        });

        const externalCursor = state?.externalCursor ?? undefined;
        const externalUpdatedAt = state?.externalUpdatedAt ?? undefined;

        await this.syncStateService.markRunning({
            source: SYNC_SOURCES.OneC,
            entity: SYNC_ENTITIES.Category,
            externalCursor,
            externalUpdatedAt,
        });

        try {
            const response = await this.client.getCategories({
                cursor: externalCursor,
                updatedAfter: externalUpdatedAt?.toISOString(),
            });

            let created = 0;
            let updated = 0;

            for (const item of response.items) {
                const payload = mapOneCCategoryToUpsertInput(item);

                const existing = await CategoryModel.findOne({
                    $or: [{ externalId: payload.externalId }, { slug: payload.slug }],
                }).lean();

                await CategoryModel.updateOne(
                    existing ? { _id: existing._id } : { externalId: payload.externalId },
                    {
                        $set: {
                            externalId: payload.externalId,
                            externalSource: SYNC_SOURCES.OneC,
                            name: payload.name,
                            nameEn: payload.nameEn,
                            nameUa: payload.nameUa,
                            slug: payload.slug,
                            image: payload.image,
                            description: payload.description,
                            isActive: payload.isActive,
                        },
                    },
                    { upsert: true },
                );

                if (existing) {
                    updated += 1;
                } else {
                    created += 1;
                }
            }

            await this.syncStateService.markSuccess({
                source: SYNC_SOURCES.OneC,
                entity: SYNC_ENTITIES.Category,
                externalCursor: response.nextCursor ?? undefined,
                externalUpdatedAt: response.updatedAt ? new Date(response.updatedAt) : new Date(),
                stats: {
                    processed: response.items.length,
                    created,
                    updated,
                    deleted: 0,
                },
            });

            logger.info(
                {
                    processed: response.items.length,
                    created,
                    updated,
                },
                "1C category sync completed",
            );
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unknown 1C category sync error";

            await this.syncStateService.markError({
                source: SYNC_SOURCES.OneC,
                entity: SYNC_ENTITIES.Category,
                errorMessage: message,
            });

            logger.error({ err: error }, "1C category sync failed");
            throw error;
        }
    }
}
