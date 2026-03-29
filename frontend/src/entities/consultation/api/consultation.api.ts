import type {
    ConsultationDTO,
    ConsultationStatus,
    CreateConsultationDTO,
} from "@shared/contracts/consultation/consultation.dto";

const BASE = "/api/consultations";

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
    }

    return res.json() as Promise<T>;
}

export const consultationApi = {
    async createConsultation(payload: CreateConsultationDTO): Promise<ConsultationDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        return json<ConsultationDTO>(res);
    },

    async getAllConsultations(): Promise<ConsultationDTO[]> {
        const res = await fetch(BASE, {
            method: "GET",
            credentials: "include",
        });

        return json<ConsultationDTO[]>(res);
    },

    async updateConsultationStatus(
        id: string,
        status: ConsultationStatus,
    ): Promise<ConsultationDTO> {
        const res = await fetch(`${BASE}/${encodeURIComponent(id)}/status`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        return json<ConsultationDTO>(res);
    },

    async deleteConsultation(id: string): Promise<{ ok: true }> {
        const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<{ ok: true }>(res);
    },
};
