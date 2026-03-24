import { isValidObjectId } from "mongoose";

import type { ID } from "@shared/primitives";

import {
    ConsultationModel,
    CONSULTATION_STATUS,
    type ConsultationDoc,
    type ConsultationStatus,
} from "@/models/consultation.model";
import { CommonErrors } from "@/errors";

function validateConsultationId(id: string) {
    if (!isValidObjectId(id)) {
        throw CommonErrors.badRequest("Invalid consultation id");
    }
}

function validateStatus(status: ConsultationStatus) {
    if (!Object.values(CONSULTATION_STATUS).includes(status)) {
        throw CommonErrors.badRequest("Invalid consultation status");
    }
}

export class ConsultationService {
    async create(data: {
        name: string;
        phone: string;
        message?: string;
        userId?: ID;
        source?: string;
    }): Promise<ConsultationDoc> {
        const doc = await ConsultationModel.create({
            ...data,
            userId: data.userId ? String(data.userId) : undefined,
            status: CONSULTATION_STATUS.New,
        });

        return doc.toObject();
    }

    async getAll(): Promise<ConsultationDoc[]> {
        return ConsultationModel.find().sort({ createdAt: -1 }).lean<ConsultationDoc[]>();
    }

    async updateStatus(id: string, status: ConsultationStatus): Promise<ConsultationDoc | null> {
        validateConsultationId(id);
        validateStatus(status);

        return ConsultationModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true },
        ).lean<ConsultationDoc | null>();
    }

    async delete(id: string): Promise<ConsultationDoc | null> {
        validateConsultationId(id);

        return ConsultationModel.findByIdAndDelete(id).lean<ConsultationDoc | null>();
    }
}
