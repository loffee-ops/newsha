import Redis from "ioredis";

import { logger } from "@/infrastructure/logger/logger";
import { env } from "@/config";

export const redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
});

redis.on("connect", () => {
    logger.info({ host: env.REDIS_HOST, port: env.REDIS_PORT }, "Redis connected");
});

redis.on("ready", () => {
    logger.info("Redis ready");
});

redis.on("reconnecting", () => {
    logger.warn("Redis reconnecting");
});

redis.on("close", () => {
    logger.warn("Redis connection closed");
});

redis.on("error", (error) => {
    logger.error({ error }, "Redis error");
});
