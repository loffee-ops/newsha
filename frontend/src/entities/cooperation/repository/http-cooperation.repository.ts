import { CooperationStatus } from "@shared/domain/cooperation";
import type { CooperationDTO, CooperationLeadDTO } from "@shared/contracts/cooperation";

import { cooperationApi } from "@/entities/cooperation/api";

import type { CooperationRepository } from "./cooperation.repository";

export class HttpCooperationRepository implements CooperationRepository {
    async createCooperation(payload: CooperationLeadDTO): Promise<CooperationDTO> {
        return cooperationApi.createCooperation(payload);
    }

    async getAllCooperations(): Promise<readonly CooperationDTO[]> {
        return cooperationApi.getAllCooperations();
    }

    async updateCooperationStatus(id: string, status: CooperationStatus): Promise<CooperationDTO> {
        return cooperationApi.updateCooperationStatus(id, status);
    }

    async deleteCooperation(id: string): Promise<void> {
        await cooperationApi.deleteCooperation(id);
    }
}
