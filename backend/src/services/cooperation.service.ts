import { isValidObjectId } from "mongoose";

import type { CooperationLeadDTO } from "@shared/contracts/cooperation";
import { COOPERATION_STATUSES } from "@shared/domain/cooperation";

import {
    CooperationModel,
    type CooperationDoc,
    type CooperationStatus,
} from "@/models/cooperation.model";
import { CommonErrors } from "@/errors";

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
    async create(dto: CooperationLeadDTO): Promise<CooperationDoc> {
        const doc = await CooperationModel.create({
            name: dto.name,
            phone: dto.phone,
            city: dto.city,
            message: dto.message,
        });

        return doc.toObject();
    }

    async getAll(): Promise<CooperationDoc[]> {
        return CooperationModel.find().sort({ createdAt: -1 }).lean<CooperationDoc[]>();
    }

    async updateStatus(id: string, status: CooperationStatus): Promise<CooperationDoc | null> {
        validateCooperationId(id);
        validateStatus(status);

        return CooperationModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true },
        ).lean<CooperationDoc | null>();
    }

    async delete(id: string): Promise<CooperationDoc | null> {
        validateCooperationId(id);

        return CooperationModel.findByIdAndDelete(id).lean<CooperationDoc | null>();
    }
}
