import type { LoginDTO, RegisterDTO } from "@shared/contracts/auth";
import type { AuthSession } from "@shared/domain/auth";

export interface AuthRepository {
    login(dto: LoginDTO): Promise<AuthSession>;
    loginWithGoogle(idToken: string): Promise<AuthSession>;
    register(dto: RegisterDTO): Promise<AuthSession>;
    restoreSession(): Promise<AuthSession | null>;
    logout(): Promise<void>;
}
