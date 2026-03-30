import type { BannerDTO } from "@shared/contracts/banner";

import type { AsyncStatus } from "@/shared/config";

export interface BannerState {
    items: readonly BannerDTO[];
    status: AsyncStatus;
    error: string | null;
}
