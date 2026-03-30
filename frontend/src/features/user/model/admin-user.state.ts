import type { User } from "@shared/domain/user";

import type { AsyncStatus } from "@/shared/config";

export interface AdminUserState {
    items: readonly User[];
    selected: User | null;

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
