import type { CooperationRepository } from "@/entities/cooperation/repository/cooperation.repository";
import { HttpCooperationRepository } from "@/entities/cooperation/repository/http-cooperation.repository";

export function createCooperationService(): CooperationRepository {
    return new HttpCooperationRepository();
}
