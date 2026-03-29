import type { HealthResponse } from "@shared/contracts/health";

const BASE = "/api/health";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText || "Request failed");
    }

    return res.json() as Promise<T>;
}

export const healthApi = {
    async getHealth(): Promise<HealthResponse> {
        const res = await fetch(BASE);
        return json<HealthResponse>(res);
    },
};
