import { isValidObjectId } from "mongoose";

import type {
    CooperationDTO,
    CooperationLeadDTO,
} from "@shared/contracts/cooperation/cooperation.dto";
import { COOPERATION_STATUSES } from "@shared/domain/cooperation";

import {
    CooperationModel,
    type CooperationDoc,
    type CooperationStatus,
} from "@/models/cooperation.model";
import { CommonErrors } from "@/errors";
import { toCooperationDTO, toCooperationDTOList } from "@/mappers/cooperation";

function validateCooperationId(id: string) {
    if (!isValidObjectId(id)) {
        throw CommonErrors.badRequest("Invalid cooperation id");
    }
}

function validateStatus(status: CooperationStatus) {
    if (typeof status !== "string" || !Object.values(COOPERATION_STATUSES).includes(status)) {
        throw CommonErrors.badRequest("Invalid cooperation status");
    }
}

export class CooperationService {
    async create(dto: CooperationLeadDTO): Promise<CooperationDTO> {
        const doc = await CooperationModel.create({
            name: dto.name,
            phone: dto.phone,
            city: dto.city,
            message: dto.message,
        });

        return toCooperationDTO(doc.toObject());
    }

    async getAll(): Promise<CooperationDTO[]> {
        const docs = await CooperationModel.find().sort({ createdAt: -1 }).lean<CooperationDoc[]>();

        return toCooperationDTOList(docs);
    }

    async updateStatus(id: string, status: CooperationStatus): Promise<CooperationDTO | null> {
        validateCooperationId(id);
        validateStatus(status);

        const doc = await CooperationModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true },
        ).lean<CooperationDoc | null>();

        return doc ? toCooperationDTO(doc) : null;
    }

    async delete(id: string): Promise<CooperationDTO | null> {
        validateCooperationId(id);

        const doc = await CooperationModel.findByIdAndDelete(id).lean<CooperationDoc | null>();

        return doc ? toCooperationDTO(doc) : null;
    }
}
