import type {
    AuthResponseDTO,
    LoginDTO,
    LogoutResponseDTO,
    RegisterDTO,
} from "@shared/contracts/auth";

const AUTH_BASE = "/api/auth";
const USER_BASE = "/api/users";

export class ApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function readErrorMessage(res: Response): Promise<string> {
    try {
        const contentType = res.headers.get("content-type") ?? "";

        if (contentType.includes("application/json")) {
            const data = (await res.json()) as { message?: string; error?: string };

            if (typeof data.message === "string" && data.message.trim()) {
                return data.message;
            }

            if (typeof data.error === "string" && data.error.trim()) {
                return data.error;
            }
        }

        const text = await res.text();

        if (text.trim()) {
            return text;
        }
    } catch {
        // ignore
    }

    return res.statusText || "Request failed";
}

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        throw new ApiError(await readErrorMessage(res), res.status);
    }

    return res.json() as Promise<T>;
}

export const authApi = {
    async login(dto: LoginDTO): Promise<AuthResponseDTO> {
        const res = await fetch(`${AUTH_BASE}/login`, {
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
        const res = await fetch(`${AUTH_BASE}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<AuthResponseDTO>(res);
    },

    async loginWithGoogle(idToken: string): Promise<AuthResponseDTO> {
        const res = await fetch(`${AUTH_BASE}/google`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });

        return json<AuthResponseDTO>(res);
    },

    async me(): Promise<AuthResponseDTO> {
        const res = await fetch(`${USER_BASE}/me`, {
            credentials: "include",
        });

        return json<AuthResponseDTO>(res);
    },

    async refresh(): Promise<AuthResponseDTO> {
        const res = await fetch(`${AUTH_BASE}/refresh`, {
            method: "POST",
            credentials: "include",
        });

        return json<AuthResponseDTO>(res);
    },

    async logout(): Promise<LogoutResponseDTO> {
        const res = await fetch(`${AUTH_BASE}/logout`, {
            method: "POST",
            credentials: "include",
        });

        return json<LogoutResponseDTO>(res);
    },

    async logoutAll(): Promise<LogoutResponseDTO> {
        const res = await fetch(`${AUTH_BASE}/logout-all`, {
            method: "POST",
            credentials: "include",
        });

        return json<LogoutResponseDTO>(res);
    },
};
