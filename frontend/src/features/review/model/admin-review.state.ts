import type { Review } from "@shared/domain/review";

import type { AsyncStatus } from "@/shared/config";

export interface AdminReviewState {
    items: readonly Review[];
    selected: Review | null;

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

    deleteStatus: AsyncStatus;
    deleteError: string | null;
}
