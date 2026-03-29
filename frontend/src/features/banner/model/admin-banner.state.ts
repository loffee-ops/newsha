import type { AsyncStatus } from "@/shared/config";
import type { AdminBannerResponse } from "@/entities/banner/types";

export interface AdminBannerState {
    items: readonly AdminBannerResponse[];
    total: number;
    page: number;
    limit: number;
    pages: number;

    status: AsyncStatus;
    error: string | null;

    uploadStatus: AsyncStatus;
    uploadError: string | null;

    updateStatus: AsyncStatus;
    updateError: string | null;

    deleteStatus: AsyncStatus;
    deleteError: string | null;
}
