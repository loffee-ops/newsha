import type { Request, Response } from "express";

import { asID } from "@shared/primitives";

import { ConsultationErrors } from "@/errors";

import { requireObjectId, requireTrimmedString, optionalTrimmedString } from "@/lib/validation";

import { ConsultationService } from "@/services";

import { CONSULTATION_STATUS, type ConsultationStatus } from "@/models";

const service = new ConsultationService();

function validateStatus(v: unknown): ConsultationStatus {
    if (
        typeof v !== "string" ||
        !Object.values(CONSULTATION_STATUS).includes(v as ConsultationStatus)
    ) {
        throw ConsultationErrors.invalidStatus();
    }

    return v as ConsultationStatus;
}

export async function createConsultation(req: Request, res: Response) {
    const name = requireTrimmedString(req.body?.name, "name", "Name is required");
    const phone = requireTrimmedString(req.body?.phone, "phone", "Phone is required");
    const message = optionalTrimmedString(req.body?.message, "message");

    const userId = req.userId ? asID(req.userId) : undefined;

    const doc = await service.create({
        name,
        phone,
        message,
        userId,
    });

    res.status(201).json(doc);
}

export async function getAllConsultations(_req: Request, res: Response) {
    const docs = await service.getAll();

    res.json(docs);
}

export async function updateConsultationStatus(req: Request, res: Response) {
    const id = requireObjectId(req.params.id, "id", "Invalid consultation id");
    const status = validateStatus(req.body?.status);

    const doc = await service.updateStatus(id, status);

    if (!doc) {
        throw ConsultationErrors.notFound();
    }

    res.json(doc);
}

export async function deleteConsultation(req: Request, res: Response) {
    const id = requireObjectId(req.params.id, "id", "Invalid consultation id");

    const doc = await service.delete(id);

    if (!doc) {
        throw ConsultationErrors.notFound();
    }

    res.json({ ok: true });
}
