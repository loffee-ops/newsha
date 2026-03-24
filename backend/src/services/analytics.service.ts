import { isValidObjectId } from "mongoose";

import type { AnalyticsEvent } from "@shared/domain/analytics";
import { ANALYTICS_EVENTS } from "@shared/domain/analytics";
import { asID } from "@shared/primitives";

import { AnalyticsEventModel } from "@/models/analytics-event.model";
import { CommonErrors, ProductErrors } from "@/errors";

type TrackContext = {
    userId?: string;
    sessionId?: string;
};

export type AnalyticsStoredEvent = AnalyticsEvent & {
    userId?: string;
    sessionId?: string;
    createdAt: Date;
    updatedAt: Date;
};

function validateLimit(limit: number): void {
    if (!Number.isFinite(limit) || limit <= 0 || limit > 500) {
        throw CommonErrors.badRequest("Invalid limit");
    }
}

function validateProductId(id: string): void {
    if (!isValidObjectId(id)) {
        throw ProductErrors.invalidProductId();
    }
}

function validateEvent(event: AnalyticsEvent): void {
    if (!event?.type || !Object.values(ANALYTICS_EVENTS).includes(event.type)) {
        throw CommonErrors.badRequest("Invalid analytics event");
    }
}

function toAnalyticsPayload(event: AnalyticsEvent, ctx?: TrackContext) {
    if (event.type === ANALYTICS_EVENTS.BEGIN_CHECKOUT) {
        return {
            ...event,
            ...ctx,
            items: event.items.map((item) => ({ ...item })),
        };
    }

    return {
        ...event,
        ...ctx,
    };
}

export class AnalyticsService {
    async track(event: AnalyticsEvent, ctx?: TrackContext): Promise<void> {
        validateEvent(event);

        await AnalyticsEventModel.create(toAnalyticsPayload(event, ctx));
    }

    async getEvents(limit = 50): Promise<AnalyticsStoredEvent[]> {
        validateLimit(limit);

        return AnalyticsEventModel.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean<AnalyticsStoredEvent[]>();
    }

    private async countByType(filter: Record<string, unknown> = {}) {
        const [views, cart, purchases] = await Promise.all([
            AnalyticsEventModel.countDocuments({
                ...filter,
                type: ANALYTICS_EVENTS.VIEW_PRODUCT,
            }),
            AnalyticsEventModel.countDocuments({
                ...filter,
                type: ANALYTICS_EVENTS.ADD_TO_CART,
            }),
            AnalyticsEventModel.countDocuments({
                ...filter,
                type: ANALYTICS_EVENTS.PURCHASE,
            }),
        ]);

        return { views, cart, purchases };
    }

    async getStats() {
        return this.countByType();
    }

    async getProductStats(productId: string) {
        validateProductId(productId);

        return this.countByType({ productId: String(asID(productId)) });
    }
}
