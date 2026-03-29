import type { ConsultationRepository } from "@/entities/consultation/repository/consultation.repository";
import { HttpConsultationRepository } from "@/entities/consultation/repository/http-consultation.repository";

export function createConsultationService(): ConsultationRepository {
    return new HttpConsultationRepository();
}
