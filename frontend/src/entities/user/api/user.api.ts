import type { ChangePasswordDTO, UpdateProfileDTO } from "@shared/contracts/user";

import type { OkResponseDTO, UserResponseDTO } from "@/entities/user/types";

const BASE = "/api/users";

export class UserApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "UserApiError";
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
        throw new UserApiError(await readErrorMessage(res), res.status);
    }

    return res.json() as Promise<T>;
}

export const userApi = {
    async getMe(): Promise<UserResponseDTO> {
        const res = await fetch(`${BASE}/me`, {
            credentials: "include",
        });

        return json<UserResponseDTO>(res);
    },

    async updateMe(dto: UpdateProfileDTO): Promise<UserResponseDTO> {
        const res = await fetch(`${BASE}/me`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<UserResponseDTO>(res);
    },

    async changePassword(dto: ChangePasswordDTO): Promise<OkResponseDTO> {
        const res = await fetch(`${BASE}/me/password`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        });

        return json<OkResponseDTO>(res);
    },
};
