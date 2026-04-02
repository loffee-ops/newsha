import type { StoreProductPreview } from "@/entities/product/types";

import type { AsyncStatus } from "@/shared/config";

export interface SearchState {
    items: StoreProductPreview[];
    status: AsyncStatus;
    error: string | null;
    query: string;
}
