import { z } from "@shared/contracts/common/zod-extend";

export const AuthSessionSchema = z.object({
    id: z.string(),
    userId: z.string(),
    expiresAt: z.string(),
    revokedAt: z.string().nullable(),
    replacedBySessionId: z.string().nullable(),
    lastUsedAt: z.string(),
    userAgent: z.string().nullable(),
    ip: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const AuthSessionsResponseSchema = z.object({
    sessions: z.array(AuthSessionSchema),
});

export const RegisterRequestSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const UpdateUserRoleRequestSchema = z.object({
    role: z.enum(["user", "admin"]),
});
