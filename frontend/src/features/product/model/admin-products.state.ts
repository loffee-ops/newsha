import type { AsyncStatus } from "@/shared/config";
import type { StoreProduct, StoreProductPreview } from "@/entities/product/types";

export interface AdminProductsState {
    items: StoreProductPreview[];
    selected: StoreProduct | null;

    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;

    status: AsyncStatus;
    error: string | null;

    createStatus: AsyncStatus;
    createError: string | null;

    updateStatus: AsyncStatus;
    updateError: string | null;

    deleteStatus: AsyncStatus;
    deleteError: string | null;

    toggleActiveStatus: AsyncStatus;
    toggleActiveError: string | null;

    toggleFlagsStatus: AsyncStatus;
    toggleFlagsError: string | null;
}
