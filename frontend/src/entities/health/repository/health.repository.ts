import type { HealthResponse } from "@shared/contracts/health";

export interface HealthRepository {
    getHealth(): Promise<HealthResponse>;
}
