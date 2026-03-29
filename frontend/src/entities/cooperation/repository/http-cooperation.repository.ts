import type {
    CooperationDTO,
    CooperationLeadDTO,
} from "@shared/contracts/cooperation/cooperation.dto";
import { CooperationStatus } from "@shared/domain/cooperation";

import { cooperationApi } from "../api/cooperation.api";
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
