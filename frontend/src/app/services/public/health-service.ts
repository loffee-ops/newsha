import type { HealthRepository } from "@/entities/health/repository/health.repository";
import { HttpHealthRepository } from "@/entities/health/repository/http-health.repository";

export function createHealthService(): HealthRepository {
    return new HttpHealthRepository();
}
