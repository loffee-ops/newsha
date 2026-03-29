import type { CooperationStatus } from "@shared/domain/cooperation";

export interface CooperationLeadDTO {
    name: string;
    phone: string;
    city: string;
    message: string;
}

export interface CooperationDTO {
    id: string;
    name: string;
    phone: string;
    city: string;
    message: string;
    status: CooperationStatus;
    createdAt: string;
    updatedAt: string;
}
