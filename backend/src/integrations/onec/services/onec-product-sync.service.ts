import { SYNC_ENTITIES, SYNC_SOURCES } from "@shared/domain/sync";

import { logger } from "@/infrastructure/logger";

import { CategoryModel, ProductModel } from "@/models";

import { indexProduct, removeProductFromIndex } from "@/modules/search";

import { SyncStateService } from "@/services";

import { OneCClient } from "@/integrations/onec/client";
import { mapOneCProductToUpsertInput } from "@/integrations/onec/mappers";

export class OneCProductSyncService {
    constructor(
        private readonly client = new OneCClient(),
        private readonly syncStateService = new SyncStateService(),
    ) {}

    async syncAll(): Promise<void> {
        const state = await this.syncStateService.get({
            source: SYNC_SOURCES.OneC,
            entity: SYNC_ENTITIES.Product,
        });

        const externalCursor = state?.externalCursor ?? undefined;
        const externalUpdatedAt = state?.externalUpdatedAt ?? undefined;

        await this.syncStateService.markRunning({
            source: SYNC_SOURCES.OneC,
            entity: SYNC_ENTITIES.Product,
            externalCursor,
            externalUpdatedAt,
        });

        try {
            const response = await this.client.getProducts({
                cursor: externalCursor,
                updatedAfter: externalUpdatedAt?.toISOString(),
            });

            let created = 0;
            let updated = 0;

            for (const item of response.items) {
                const payload = mapOneCProductToUpsertInput(item);

                let categoryId = "";

                if (payload.categoryExternalId) {
                    const category = await CategoryModel.findOne({
                        externalId: payload.categoryExternalId,
                        externalSource: SYNC_SOURCES.OneC,
                    }).lean();

                    if (!category) {
                        logger.warn(
                            {
                                productExternalId: payload.externalId,
                                categoryExternalId: payload.categoryExternalId,
                            },
                            "1C product skipped because category was not found",
                        );
                        continue;
                    }

                    categoryId = String(category._id);
                }

                const existing = await ProductModel.findOne({
                    $or: [{ externalId: payload.externalId }, { code: payload.code }],
                }).lean();

                await ProductModel.updateOne(
                    existing ? { _id: existing._id } : { externalId: payload.externalId },
                    {
                        $set: {
                            externalId: payload.externalId,
                            externalSource: SYNC_SOURCES.OneC,
                            code: payload.code,
                            name: payload.name,
                            nameEn: payload.nameEn,
                            nameUa: payload.nameUa,
                            slug: payload.slug,
                            categoryId,
                            image: payload.image,
                            gallery: payload.gallery,
                            price: payload.price,
                            oldPrice: payload.oldPrice,
                            basePrice: payload.basePrice,
                            baseOldPrice: payload.baseOldPrice,
                            shortDescription: payload.shortDescription,
                            description: payload.description,
                            howToUse: payload.howToUse,
                            effects: payload.effects,
                            ingredients: payload.ingredients,
                            tags: payload.tags,
                            needs: payload.needs,
                            condition: payload.condition,
                            volumes: payload.volumes,
                            isNewArrival: payload.isNewArrival,
                            isBestseller: payload.isBestseller,
                            isTop: payload.isTop,
                            isActive: payload.isActive,
                        },
                    },
                    { upsert: true },
                );

                const actual = await ProductModel.findOne({
                    externalId: payload.externalId,
                    externalSource: SYNC_SOURCES.OneC,
                }).lean();

                if (actual) {
                    if (actual.isActive) {
                        await indexProduct(String(actual._id));
                    } else {
                        await removeProductFromIndex(String(actual._id));
                    }
                }

                if (existing) {
                    updated += 1;
                } else {
                    created += 1;
                }
            }

            await this.syncStateService.markSuccess({
                source: SYNC_SOURCES.OneC,
                entity: SYNC_ENTITIES.Product,
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
                "1C product sync completed",
            );
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unknown 1C product sync error";

            await this.syncStateService.markError({
                source: SYNC_SOURCES.OneC,
                entity: SYNC_ENTITIES.Product,
                errorMessage: message,
            });

            logger.error({ err: error }, "1C product sync failed");
            throw error;
        }
    }
}
