import { z } from "@shared/contracts/common/zod-extend";

export const ConsultationSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    message: z.string().optional(),
    userId: z.string().optional(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CreateConsultationRequestSchema = z.object({
    name: z.string(),
    phone: z.string(),
    message: z.string().optional(),
});

export const UpdateConsultationStatusRequestSchema = z.object({
    status: z.string(),
});
