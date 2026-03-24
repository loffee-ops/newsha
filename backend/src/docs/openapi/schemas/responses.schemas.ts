import { z } from "@shared/contracts/common/zod-extend";

export const UserPayloadSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    avatar: z.string().optional(),
    role: z.enum(["user", "admin", "guest"]),
});

export const UserResponseSchema = z.object({
    user: UserPayloadSchema,
});

export const OkResponseSchema = z.object({
    ok: z.literal(true),
});

export const ErrorResponseSchema = z.object({
    code: z.string(),
    kind: z.string(),
    message: z.string(),
});
