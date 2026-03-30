import type { PaginatedResponse } from "@shared/contracts/pagination";

import type { StoreProduct, StoreProductPreview } from "@/entities/product/types";

import type { AsyncStatus } from "@/shared/config";

export type ProductListMeta = PaginatedResponse<unknown>["meta"] | null;

export type ProductState = {
    items: StoreProductPreview[];
    itemsMeta: ProductListMeta;

    selected: StoreProduct | null;

    listStatus: AsyncStatus;
    selectedStatus: AsyncStatus;

    error: string | null;
};
