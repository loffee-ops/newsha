import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { CommonErrors, CooperationErrors } from "@/errors";

import { CooperationService } from "@/services";

import { COOPERATION_STATUSES, type CooperationStatus } from "@/models";

const service = new CooperationService();

function getParam(v: string | string[]): string {
    if (Array.isArray(v)) {
        throw CommonErrors.badRequest("Invalid param");
    }

    return v;
}

function validateId(idRaw: string | string[]): string {
    const id = getParam(idRaw);

    if (!isValidObjectId(id)) {
        throw CooperationErrors.invalidId();
    }

    return id;
}

function validateStatus(v: unknown): CooperationStatus {
    if (
        typeof v !== "string" ||
        !Object.values(COOPERATION_STATUSES).includes(v as CooperationStatus)
    ) {
        throw CooperationErrors.invalidStatus();
    }

    return v as CooperationStatus;
}

function validateRequiredString(value: unknown): string {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw CooperationErrors.requiredFields();
    }

    return value.trim();
}

function validateOptionalString(value: unknown): string {
    if (value == null) {
        return "";
    }

    if (typeof value !== "string") {
        throw CommonErrors.badRequest("Invalid field");
    }

    return value.trim();
}

export async function createCooperation(req: Request, res: Response) {
    const name = validateRequiredString(req.body?.name);
    const phone = validateRequiredString(req.body?.phone);
    const city = validateRequiredString(req.body?.city);
    const message = validateOptionalString(req.body?.message);

    const doc = await service.create({
        name,
        phone,
        city,
        message,
    });

    res.status(201).json(doc);
}

export async function getAllCooperations(_req: Request, res: Response) {
    const docs = await service.getAll();

    res.json(docs);
}

export async function updateCooperationStatus(req: Request, res: Response) {
    const id = validateId(req.params.id);
    const status = validateStatus(req.body?.status);

    const doc = await service.updateStatus(id, status);

    if (!doc) {
        throw CooperationErrors.notFound();
    }

    res.json(doc);
}

export async function deleteCooperation(req: Request, res: Response) {
    const id = validateId(req.params.id);

    const doc = await service.delete(id);

    if (!doc) {
        throw CooperationErrors.notFound();
    }

    res.json({ ok: true });
}
