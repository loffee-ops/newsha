import type { AuthRepository } from "@/entities/auth/repository";
import { HttpAuthRepository } from "@/entities/auth/repository";

export function createAuthService(): AuthRepository {
    return new HttpAuthRepository();
}
