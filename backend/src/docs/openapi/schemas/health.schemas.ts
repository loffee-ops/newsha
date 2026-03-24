import { z } from "@shared/contracts/common/zod-extend";

export const HealthResponseSchema = z.object({
    status: z.string(),
    db: z.enum(["up", "connecting", "disconnecting", "down"]),
    uptime: z.number(),
    timestamp: z.string(),
});
