import type { CooperationDTO } from "@shared/contracts/cooperation";

import type { CooperationDoc } from "@/models";

export function toCooperationDTO(doc: CooperationDoc): CooperationDTO {
    return {
        id: String(doc._id),
        name: doc.name,
        phone: doc.phone,
        city: doc.city,
        message: doc.message,
        status: doc.status,
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
    };
}

export function toCooperationDTOList(docs: readonly CooperationDoc[]): CooperationDTO[] {
    return docs.map(toCooperationDTO);
}
