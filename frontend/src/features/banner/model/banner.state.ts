import type { AsyncStatus } from "@/shared/config";
import type { BannerDTO } from "@shared/contracts/banner";

export interface BannerState {
    items: readonly BannerDTO[];
    status: AsyncStatus;
    error: string | null;
}
