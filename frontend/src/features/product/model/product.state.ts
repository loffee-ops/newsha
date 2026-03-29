import type { PaginatedResponse } from "@shared/contracts/pagination";
import type { AsyncStatus } from "@/shared/config";
import type { StoreProduct, StoreProductPreview } from "@/entities/product/types";

export type ProductListMeta = PaginatedResponse<unknown>["meta"] | null;

export type ProductState = {
    items: StoreProductPreview[];
    itemsMeta: ProductListMeta;

    searchItems: StoreProductPreview[];

    selected: StoreProduct | null;

    listStatus: AsyncStatus;
    searchStatus: AsyncStatus;
    selectedStatus: AsyncStatus;

    error: string | null;
};
