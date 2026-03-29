import type {
    AuthResponseDTO,
    LoginDTO,
    LogoutResponseDTO,
    RegisterDTO,
} from "@shared/contracts/auth";

const BASE = "/api/auth";

export class ApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new ApiError(text || res.statusText, res.status);
    }

    return res.json() as Promise<T>;
}

export const authApi = {
    async login(dto: LoginDTO): Promise<AuthResponseDTO> {
        const res = await fetch(`${BASE}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<AuthResponseDTO>(res);
    },

    async register(dto: RegisterDTO): Promise<AuthResponseDTO> {
        const res = await fetch(`${BASE}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<AuthResponseDTO>(res);
    },

    async me(): Promise<AuthResponseDTO> {
        const res = await fetch(`${BASE}/me`, {
            credentials: "include",
        });

        return json<AuthResponseDTO>(res);
    },

    async refresh(): Promise<AuthResponseDTO> {
        const res = await fetch(`${BASE}/refresh`, {
            method: "POST",
            credentials: "include",
        });

        return json<AuthResponseDTO>(res);
    },

    async logout(): Promise<LogoutResponseDTO> {
        const res = await fetch(`${BASE}/logout`, {
            method: "POST",
            credentials: "include",
        });

        return json<LogoutResponseDTO>(res);
    },

    async logoutAll(): Promise<LogoutResponseDTO> {
        const res = await fetch(`${BASE}/logout-all`, {
            method: "POST",
            credentials: "include",
        });

        return json<LogoutResponseDTO>(res);
    },
};
