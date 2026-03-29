import type { CooperationLeadDTO } from "@shared/contracts/cooperation";
import type { CooperationStatus } from "@shared/domain/cooperation";
import type { ID, ISODate } from "@shared/primitives";

const BASE = "/api/cooperation";

export type CooperationDTO = {
    id: ID;
    name: string;
    phone: string;
    city: string;
    message: string;
    status: CooperationStatus;
    createdAt: ISODate;
    updatedAt: ISODate;
};

export type DeleteCooperationResponseDTO = {
    ok: true;
};

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
    }

    return res.json() as Promise<T>;
}

export const cooperationApi = {
    async send(values: CooperationLeadDTO): Promise<CooperationDTO> {
        const res = await fetch(BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        return json<CooperationDTO>(res);
    },

    async getAll(): Promise<CooperationDTO[]> {
        const res = await fetch(BASE, {
            credentials: "include",
        });

        return json<CooperationDTO[]>(res);
    },

    async updateStatus(id: ID, status: CooperationStatus): Promise<CooperationDTO> {
        const res = await fetch(`${BASE}/${id}/status`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        return json<CooperationDTO>(res);
    },

    async delete(id: ID): Promise<DeleteCooperationResponseDTO> {
        const res = await fetch(`${BASE}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        return json<DeleteCooperationResponseDTO>(res);
    },
};
