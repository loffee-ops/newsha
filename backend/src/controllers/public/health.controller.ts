import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { DbStatus, HealthResponse, RedisStatus } from "@shared/contracts/health";

import { redis } from "@/infrastructure/redis";

function getDbStatus(): DbStatus {
    switch (mongoose.connection.readyState) {
        case 1:
            return "up";
        case 2:
            return "connecting";
        case 3:
            return "disconnecting";
        default:
            return "down";
    }
}

function getRedisStatus(): RedisStatus {
    switch (redis.status) {
        case "ready":
            return "up";
        case "connect":
        case "connecting":
        case "reconnecting":
            return "connecting";
        default:
            return "down";
    }
}

export async function health(_req: Request, res: Response<HealthResponse>): Promise<void> {
    const db = getDbStatus();
    const redis = getRedisStatus();

    const isOk = (db === "up" || db === "connecting") && (redis === "up" || redis === "connecting");

    const payload: HealthResponse = {
        status: isOk ? "ok" : "error",
        db,
        redis,
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    };

    res.status(isOk ? 200 : 503).json(payload);
}
