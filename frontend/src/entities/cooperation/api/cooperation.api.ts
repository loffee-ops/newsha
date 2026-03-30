import { CooperationStatus } from "@shared/domain/cooperation";
import type {
    CooperationDTO,
    CooperationLeadDTO,
} from "@shared/contracts/cooperation/cooperation.dto";

const BASE = "/api/cooperations";

export class CooperationApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "CooperationApiError";
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
        throw new CooperationApiError(await readErrorMessage(res), res.status);
    }

    return res.json() as Promise<T>;
}

export const cooperationApi = {
    async createCooperation(payload: CooperationLeadDTO): Promise<CooperationDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<CooperationDTO>(res);
    },

    async getAllCooperations(): Promise<CooperationDTO[]> {
        const res = await fetch(BASE, {
            method: "GET",
            credentials: "include",
        });

        return json<CooperationDTO[]>(res);
    },

    async updateCooperationStatus(id: string, status: CooperationStatus): Promise<CooperationDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(id)}/status`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        return json<CooperationDTO>(res);
    },

    async deleteCooperation(id: string): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },
};

export type { CooperationDTO };
