import { isValidObjectId } from "mongoose";

import type { AnalyticsErrorPayload, AnalyticsEvent, CheckoutItem } from "@shared/domain/analytics";
import { ANALYTICS_EVENTS } from "@shared/domain/analytics";

import { AnalyticsEventModel } from "@/models/analytics-event.model";
import { CommonErrors, ProductErrors } from "@/errors";

type TrackContext = {
    userId?: string;
    sessionId?: string;
};

export type AnalyticsStoredEvent = AnalyticsEvent & {
    _id: string;
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

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeErrorPayload(value: unknown): AnalyticsErrorPayload {
    if (value instanceof Error) {
        return {
            message: value.message,
            name: value.name,
            stack: value.stack,
        };
    }

    if (typeof value === "string") {
        return { message: value };
    }

    if (isPlainObject(value)) {
        const message =
            typeof value.message === "string" && value.message.trim()
                ? value.message
                : "Unknown error";

        return {
            message,
            name: typeof value.name === "string" ? value.name : undefined,
            stack: typeof value.stack === "string" ? value.stack : undefined,
        };
    }

    return { message: "Unknown error" };
}

function normalizeCheckoutItems(items: readonly CheckoutItem[]): CheckoutItem[] {
    return items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        price: item.price,
        value: item.value,
    }));
}

function validateEvent(event: AnalyticsEvent): void {
    if (!event?.type || !Object.values(ANALYTICS_EVENTS).includes(event.type)) {
        throw CommonErrors.badRequest("Invalid analytics event");
    }
}

function toAnalyticsPayload(event: AnalyticsEvent, ctx?: TrackContext) {
    switch (event.type) {
        case ANALYTICS_EVENTS.PAGE_VIEW:
            return {
                type: event.type,
                path: event.path,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.SEARCH:
            return {
                type: event.type,
                query: event.query,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.ERROR:
            return {
                type: event.type,
                error: normalizeErrorPayload(event.error),
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.VIEW_PRODUCT:
            return {
                type: event.type,
                productId: String(event.productId),
                name: event.name,
                price: event.price,
                value: event.value,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.ADD_TO_CART:
            return {
                type: event.type,
                productId: String(event.productId),
                price: event.price,
                qty: event.qty,
                value: event.value,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.BEGIN_CHECKOUT:
            return {
                type: event.type,
                items: normalizeCheckoutItems(event.items),
                totalQty: event.totalQty,
                totalPrice: event.totalPrice,
                value: event.value,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.PURCHASE:
            return {
                type: event.type,
                orderId: String(event.orderId),
                total: event.total,
                value: event.value,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.PAGE_LEAVE:
            return {
                type: event.type,
                path: event.path,
                duration: event.duration,
                utm: event.utm,
                ...ctx,
            };

        case ANALYTICS_EVENTS.TIME_ON_PAGE:
            return {
                type: event.type,
                path: event.path,
                duration: event.duration,
                utm: event.utm,
                ...ctx,
            };

        default:
            throw CommonErrors.badRequest("Invalid analytics event");
    }
}

export class AnalyticsService {
    async track(event: AnalyticsEvent, ctx?: TrackContext): Promise<void> {
        validateEvent(event);

        await AnalyticsEventModel.create(toAnalyticsPayload(event, ctx));
    }

    async getEvents(limit = 50): Promise<AnalyticsStoredEvent[]> {
        validateLimit(limit);

        const docs = await AnalyticsEventModel.find({}).sort({ createdAt: -1 }).limit(limit).lean();

        return docs.map((doc) => ({
            ...doc,
            _id: String(doc._id),
        })) as AnalyticsStoredEvent[];
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

        return this.countByType({ productId });
    }
}
