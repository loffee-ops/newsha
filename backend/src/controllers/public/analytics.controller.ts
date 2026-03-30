import type { Request, Response } from "express";

import { AnalyticsErrors } from "@/errors";

import type { AnalyticsEvent } from "@shared/domain/analytics";

import { AnalyticsService } from "@/services";

const service = new AnalyticsService();

function getHeaderValue(value: string | string[] | undefined): string | undefined {
    if (Array.isArray(value)) {
        return value[0];
    }

    return value;
}

function parseLimit(value: unknown): number {
    const raw = Array.isArray(value) ? value[0] : value;
    const limit = Number(raw);

    if (!Number.isFinite(limit) || limit <= 0) {
        return 50;
    }

    return Math.min(Math.trunc(limit), 100);
}

function validateEvent(value: unknown): AnalyticsEvent {
    if (!value || typeof value !== "object" || !("type" in value)) {
        throw AnalyticsErrors.invalidEvent();
    }

    return value as AnalyticsEvent;
}

export async function trackEvent(req: Request, res: Response) {
    const event = validateEvent(req.body);
    const userId = req.userId;
    const sessionId = getHeaderValue(req.headers["x-session-id"]);

    await service.track(event, { userId, sessionId });

    res.status(201).json({ ok: true });
}

export async function getAnalytics(req: Request, res: Response) {
    const limit = parseLimit(req.query.limit);
    const events = await service.getEvents(limit);

    res.json(events);
}

export async function getAnalyticsStats(_req: Request, res: Response) {
    const stats = await service.getStats();

    res.json(stats);
}
