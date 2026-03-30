import type { StoreProductPreview } from "@/entities/product/types";

import type { AsyncStatus } from "@/shared/config";

export interface RecentlyViewedState {
    items: StoreProductPreview[];
    status: AsyncStatus;
    error: string | null;
    addStatus: AsyncStatus;
    addError: string | null;
}
