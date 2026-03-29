import type {
    ConsultationDTO,
    ConsultationStatus,
    CreateConsultationDTO,
} from "@shared/contracts/consultation/consultation.dto";

import { consultationApi } from "../api/consultation.api";
import type { ConsultationRepository } from "./consultation.repository";

export class HttpConsultationRepository implements ConsultationRepository {
    async createConsultation(payload: CreateConsultationDTO): Promise<ConsultationDTO> {
        return consultationApi.createConsultation(payload);
    }

    async getAllConsultations(): Promise<readonly ConsultationDTO[]> {
        return consultationApi.getAllConsultations();
    }

    async updateConsultationStatus(
        id: string,
        status: ConsultationStatus,
    ): Promise<ConsultationDTO> {
        return consultationApi.updateConsultationStatus(id, status);
    }

    async deleteConsultation(id: string): Promise<void> {
        await consultationApi.deleteConsultation(id);
    }
}
