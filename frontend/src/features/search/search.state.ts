import type { AsyncStatus } from "@/shared/config";
import type { StoreProductPreview } from "@/entities/product/types";

export interface SearchState {
    items: StoreProductPreview[];
    status: AsyncStatus;
    error: string | null;
    query: string;
}
