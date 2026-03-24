import type { Request, Response } from "express";
import mongoose from "mongoose";

import { redis } from "@/infrastructure/redis";

import type { HealthResponse, DbStatus, RedisStatus } from "@shared/contracts/health";

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
    const status = redis.status;

    if (status === "ready") {
        return "up";
    }

    if (status === "connect" || status === "connecting" || status === "reconnecting") {
        return "connecting";
    }

    return "down";
}

export async function health(_req: Request, res: Response<HealthResponse>) {
    const db = getDbStatus();
    const redisStatus = getRedisStatus();

    const isOk =
        (db === "up" || db === "connecting") &&
        (redisStatus === "up" || redisStatus === "connecting");

    const payload: HealthResponse = {
        status: isOk ? "ok" : "error",
        db,
        redis: redisStatus,
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    };

    res.status(isOk ? 200 : 503).json(payload);
}
