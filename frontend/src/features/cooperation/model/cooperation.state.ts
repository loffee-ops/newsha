import type { AsyncStatus } from "@/shared/config";
import type { CooperationDTO } from "@shared/contracts/cooperation/cooperation.dto";

export interface CooperationState {
    items: readonly CooperationDTO[];
    status: AsyncStatus;
    error: string | null;
    submitStatus: AsyncStatus;
    submitError: string | null;
}
