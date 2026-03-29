import type { AsyncStatus } from "@/shared/config";
import type { StoreProductPreview } from "@/entities/product/types";

export interface RecentlyViewedState {
    items: StoreProductPreview[];
    status: AsyncStatus;
    error: string | null;
    addStatus: AsyncStatus;
    addError: string | null;
}
