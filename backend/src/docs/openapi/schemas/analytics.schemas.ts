import { z } from "@shared/contracts/common/zod-extend";

import { ANALYTICS_EVENT_VALUES } from "@shared/domain/analytics";

export const CheckoutItemSchema = z.object({
    productId: z.string(),
    qty: z.number(),
    price: z.number(),
    value: z.number(),
});

export const AnalyticsEventSchema = z.object({
    type: z.enum(ANALYTICS_EVENT_VALUES),
    path: z.string().optional(),
    duration: z.number().optional(),
    query: z.string().optional(),
    error: z.unknown().optional(),
    productId: z.string().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    qty: z.number().optional(),
    value: z.number().optional(),
    items: z.array(CheckoutItemSchema).optional(),
    totalQty: z.number().optional(),
    totalPrice: z.number().optional(),
    orderId: z.string().optional(),
    total: z.number().optional(),
    userId: z.string().optional(),
    sessionId: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const AnalyticsStatsSchema = z.object({
    views: z.number(),
    cart: z.number(),
    purchases: z.number(),
});
