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
    user: import("@shared/domain/user").User;
}

export interface LogoutResponseDTO {
    ok: true;
}
