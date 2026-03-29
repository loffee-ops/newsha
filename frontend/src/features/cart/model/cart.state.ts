import type { CartRow } from "@shared/domain/cart";
import type { AsyncStatus } from "@/shared/config";

export type CartState = {
    rows: readonly CartRow[];
    status: AsyncStatus;
    error: string | null;
};
