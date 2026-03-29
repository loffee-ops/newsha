import type { AnalyticsEvent } from "@shared/domain/analytics";

const PUBLIC_BASE = "/api/analytics";
const ADMIN_BASE = "/api/admin/analytics";

export type AnalyticsTrackResponseDTO = {
    ok: true;
};

export type AnalyticsStatsDTO = {
    views: number;
    cart: number;
    purchases: number;
};

export type AnalyticsStoredEventDTO = AnalyticsEvent & {
    id?: string;
    userId?: string;
    sessionId?: string;
    createdAt: string;
    updatedAt: string;
};

export class AnalyticsApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "AnalyticsApiError";
        this.status = status;
    }
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return "Unknown analytics error";
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
        throw new AnalyticsApiError(await readErrorMessage(res), res.status);
    }

    return res.json() as Promise<T>;
}

function normalizeLimit(limit: number): number {
    if (!Number.isFinite(limit) || limit <= 0) {
        return 50;
    }

    return Math.min(Math.trunc(limit), 100);
}

export const analyticsApi = {
    async track(event: AnalyticsEvent, sessionId?: string): Promise<AnalyticsTrackResponseDTO> {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (sessionId) {
            headers["x-session-id"] = sessionId;
        }

        const res = await fetch(PUBLIC_BASE, {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify(event),
        });

        return json<AnalyticsTrackResponseDTO>(res);
    },

    async getEvents(limit = 50): Promise<AnalyticsStoredEventDTO[]> {
        const params = new URLSearchParams({
            limit: String(normalizeLimit(limit)),
        });

        const res = await fetch(`${ADMIN_BASE}?${params.toString()}`, {
            method: "GET",
            credentials: "include",
        });

        return json<AnalyticsStoredEventDTO[]>(res);
    },

    async getStats(): Promise<AnalyticsStatsDTO> {
        const res = await fetch(`${ADMIN_BASE}/stats`, {
            method: "GET",
            credentials: "include",
        });

        return json<AnalyticsStatsDTO>(res);
    },
};
