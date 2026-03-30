import type { Review } from "@shared/domain/review";

import type { AsyncStatus } from "@/shared/config";

export interface ReviewState {
    items: readonly Review[];
    status: AsyncStatus;
    error: string | null;

    createStatus: AsyncStatus;
    createError: string | null;

    actionStatus: AsyncStatus;
    actionError: string | null;
}
