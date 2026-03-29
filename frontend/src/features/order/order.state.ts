import type { PaginationMetaDTO } from "@shared/contracts/pagination";
import type { AsyncStatus } from "@/shared/config";
import type { StoreOrder } from "@/entities/order/types/order.store.types";

export type PaginatedOrders = {
    data: StoreOrder[];
    meta: PaginationMetaDTO;
};

export type OrderState = {
    current: StoreOrder | null;
    list: PaginatedOrders;
    ordersStatus: AsyncStatus;
    ordersError: string | null;
};
