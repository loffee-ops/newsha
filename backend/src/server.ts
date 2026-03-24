import "dotenv/config";
import mongoose from "mongoose";
import type { Server } from "http";

import { app } from "./app";

import { redis } from "@/infrastructure/redis";
import { logger } from "@/infrastructure/logger/logger";
import { env } from "@/config";

let server: Server | null = null;
let isShuttingDown = false;

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function shutdown(signal: string) {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;
    logger.warn({ signal }, "Shutdown started");

    const forceExitTimer = setTimeout(() => {
        logger.fatal({ signal, timeoutMs: SHUTDOWN_TIMEOUT_MS }, "Forced shutdown by timeout");
        process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);

    forceExitTimer.unref();

    try {
        const currentServer = server;

        if (currentServer) {
            await new Promise<void>((resolve, reject) => {
                currentServer.close((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve();
                });
            });
        }

        await Promise.allSettled([mongoose.disconnect(), redis.quit()]);

        logger.info("Shutdown completed");
        process.exit(0);
    } catch (error) {
        logger.error({ err: error, signal }, "Shutdown error");
        process.exit(1);
    }
}

process.on("SIGINT", () => {
    void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
});

process.on("unhandledRejection", (reason) => {
    logger.fatal({ err: reason }, "Unhandled promise rejection");
    void shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
    logger.fatal({ err: error }, "Uncaught exception");
    void shutdown("uncaughtException");
});

async function start() {
    try {
        logger.info(
            {
                port: env.PORT,
                mongoUriExists: Boolean(env.MONGO_URI),
            },
            "Starting server",
        );

        await mongoose.connect(env.MONGO_URI);
        logger.info("Mongo connected");

        server = app.listen(env.PORT, () => {
            logger.info({ port: env.PORT }, "Server started");
        });
    } catch (error) {
        logger.error({ err: error }, "Server startup error");
        process.exit(1);
    }
}

void start();
