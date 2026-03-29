export const CONSULTATION_STATUS = {
    New: "new",
    InProgress: "in_progress",
    Resolved: "resolved",
    Cancelled: "cancelled",
} as const;

export type ConsultationStatus = (typeof CONSULTATION_STATUS)[keyof typeof CONSULTATION_STATUS];

export type ConsultationDTO = {
    id: string;
    userId?: string;
    name: string;
    phone: string;
    message?: string;
    source?: string;
    status: ConsultationStatus;
    createdAt?: string;
    updatedAt?: string;
};

export type CreateConsultationDTO = {
    name: string;
    phone: string;
    message?: string;
};
