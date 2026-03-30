import type { Request, Response } from "express";
import mongoose from "mongoose";

import { DB_STATUS, HEALTH_STATUS, REDIS_STATUS } from "@shared/domain/health";
import type { DbStatus, HealthResponse, RedisStatus } from "@shared/contracts/health";

import { redis } from "@/infrastructure/redis";

function getDbStatus(): DbStatus {
    switch (mongoose.connection.readyState) {
        case 1:
            return DB_STATUS.UP;
        case 2:
            return DB_STATUS.CONNECTING;
        case 3:
            return DB_STATUS.DISCONNECTING;
        default:
            return DB_STATUS.DOWN;
    }
}

function getRedisStatus(): RedisStatus {
    switch (redis.status) {
        case "ready":
            return REDIS_STATUS.UP;
        case "connect":
        case "connecting":
        case "reconnecting":
            return REDIS_STATUS.CONNECTING;
        default:
            return REDIS_STATUS.DOWN;
    }
}

export async function health(_req: Request, res: Response<HealthResponse>): Promise<void> {
    const db = getDbStatus();
    const redisStatus = getRedisStatus();

    const isOk =
        (db === DB_STATUS.UP || db === DB_STATUS.CONNECTING) &&
        (redisStatus === REDIS_STATUS.UP || redisStatus === REDIS_STATUS.CONNECTING);

    const payload: HealthResponse = {
        status: isOk ? HEALTH_STATUS.OK : HEALTH_STATUS.ERROR,
        db,
        redis: redisStatus,
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
    };

    res.status(isOk ? 200 : 503).json(payload);
}
