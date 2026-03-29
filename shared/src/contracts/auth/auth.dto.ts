import type { User } from "@shared/domain/user";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface AuthResponseDTO {
    user: User;
}

export interface LogoutResponseDTO {
    ok: true;
}
