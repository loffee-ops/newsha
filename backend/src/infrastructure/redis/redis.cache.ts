import { logger } from "@/infrastructure/logger";

import { redis } from "./redis.client";

export async function cacheGet<T>(key: string): Promise<T | null> {
    try {
        const data = await redis.get(key);

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data) as T;
        } catch {
            return null;
        }
    } catch (error) {
        logger.warn({ error, key }, "cacheGet failed");
        return null;
    }
}

export async function cacheSet(key: string, value: unknown, ttlSec: number): Promise<void> {
    try {
        await redis.set(key, JSON.stringify(value), "EX", ttlSec);
    } catch (error) {
        logger.warn({ error, key }, "cacheSet failed");
    }
}

export async function cacheDel(key: string): Promise<void> {
    try {
        await redis.del(key);
    } catch (error) {
        logger.warn({ error, key }, "cacheDel failed");
    }
}
