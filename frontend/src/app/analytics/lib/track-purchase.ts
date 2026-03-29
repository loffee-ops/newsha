import { analyticsApi } from "@/app/analytics/api";

import type { Order } from "@shared/domain/order";
import type { PurchaseParams } from "@shared/domain/analytics";

function toPurchaseParams(order: Order): PurchaseParams {
    return {
        orderId: order.id,
        total: order.total,
        value: order.total,
    };
}

export function trackPurchase(order: Order) {
    analyticsApi.purchase(toPurchaseParams(order));
}
