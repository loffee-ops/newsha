import type { PurchaseParams } from "@shared/domain/analytics";
import type { Order } from "@shared/domain/order";

import { analytics } from "@/entities/analytics/api";

function toPurchaseParams(order: Order): PurchaseParams {
    return {
        orderId: order.id,
        total: order.total,
        value: order.total,
    };
}

export function trackPurchase(order: Order): void {
    analytics.purchase(toPurchaseParams(order));
}
