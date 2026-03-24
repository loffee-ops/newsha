import { z } from "@shared/contracts/common/zod-extend";

export const CooperationSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    city: z.string(),
    message: z.string(),
    status: z.enum(["new", "in_progress", "done", "rejected"]),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const CreateCooperationRequestSchema = z.object({
    name: z.string(),
    phone: z.string(),
    city: z.string(),
    message: z.string().optional(),
});

export const UpdateCooperationStatusRequestSchema = z.object({
    status: z.enum(["new", "in_progress", "done", "rejected"]),
});
