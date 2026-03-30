import type { CooperationDTO } from "@shared/contracts/cooperation";

import type { AsyncStatus } from "@/shared/config";

export interface CooperationState {
    items: readonly CooperationDTO[];
    status: AsyncStatus;
    error: string | null;
    submitStatus: AsyncStatus;
    submitError: string | null;
}
