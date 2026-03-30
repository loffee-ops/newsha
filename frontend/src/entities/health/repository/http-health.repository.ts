import type { HealthResponse } from "@shared/contracts/health";

import { healthApi } from "@/entities/health/api";

import type { HealthRepository } from "./health.repository";

export class HttpHealthRepository implements HealthRepository {
    async getHealth(): Promise<HealthResponse> {
        return healthApi.getHealth();
    }
}
