import type { AuthResponseDTO, LoginDTO, RegisterDTO } from "@shared/contracts/auth";
import type { AuthSession } from "@shared/domain/auth";

import { authApi, ApiError } from "../api/auth.api";
import type { AuthRepository } from "./auth.repository";

function toAuthSession(data: AuthResponseDTO): AuthSession {
    return {
        user: data.user,
    };
}

export class HttpAuthRepository implements AuthRepository {
    async login(dto: LoginDTO): Promise<AuthSession> {
        const response = await authApi.login(dto);
        return toAuthSession(response);
    }

    async loginWithGoogle(idToken: string): Promise<AuthSession> {
        const response = await authApi.loginWithGoogle(idToken);
        return toAuthSession(response);
    }

    async register(dto: RegisterDTO): Promise<AuthSession> {
        const response = await authApi.register(dto);
        return toAuthSession(response);
    }

    async restoreSession(): Promise<AuthSession | null> {
        try {
            const response = await authApi.me();
            return toAuthSession(response);
        } catch (error) {
            if (!(error instanceof ApiError) || error.status !== 401) {
                throw error;
            }
        }

        try {
            await authApi.refresh();

            const response = await authApi.me();
            return toAuthSession(response);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                return null;
            }

            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await authApi.logout();
        } catch {
            // ignore logout
        }
    }
}
