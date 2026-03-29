import type {
    ConsultationDTO,
    ConsultationStatus,
    CreateConsultationDTO,
} from "@shared/contracts/consultation/consultation.dto";

export interface ConsultationRepository {
    createConsultation(payload: CreateConsultationDTO): Promise<ConsultationDTO>;
    getAllConsultations(): Promise<readonly ConsultationDTO[]>;
    updateConsultationStatus(id: string, status: ConsultationStatus): Promise<ConsultationDTO>;
    deleteConsultation(id: string): Promise<void>;
}
