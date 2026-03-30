import type { StoreOrder } from "@/entities/order/types";

import type { AsyncStatus } from "@/shared/config";

export interface AdminOrderState {
    items: StoreOrder[];
    selected: StoreOrder | null;

    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;

    status: AsyncStatus;
    error: string | null;

    updateStatus: AsyncStatus;
    updateError: string | null;
}
