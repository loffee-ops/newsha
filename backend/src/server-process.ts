import mongoose from "mongoose";
import type { Server } from "http";

import { redis } from "@/infrastructure/redis";
import { logger } from "@/infrastructure/logger";

import { PROCESS_SIGNALS, SERVER_LOG_MESSAGES, SHUTDOWN_TIMEOUT_MS } from "./server.constants";

let isShuttingDown = false;

type SetupServerProcessOptions = {
    getServer: () => Server | null;
};

export function setupServerProcess({ getServer }: SetupServerProcessOptions) {
    async function shutdown(signal: string) {
        if (isShuttingDown) {
            return;
        }

        isShuttingDown = true;
        logger.warn({ signal }, SERVER_LOG_MESSAGES.shutdownStarted);

        const forceExitTimer = setTimeout(() => {
            logger.fatal(
                { signal, timeoutMs: SHUTDOWN_TIMEOUT_MS },
                SERVER_LOG_MESSAGES.forcedShutdownByTimeout,
            );
            process.exit(1);
        }, SHUTDOWN_TIMEOUT_MS);

        forceExitTimer.unref();

        try {
            const currentServer = getServer();

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

            logger.info(SERVER_LOG_MESSAGES.shutdownCompleted);
            process.exit(0);
        } catch (error) {
            logger.error({ err: error, signal }, SERVER_LOG_MESSAGES.shutdownError);
            process.exit(1);
        }
    }

    process.on(PROCESS_SIGNALS.sigint, () => {
        void shutdown(PROCESS_SIGNALS.sigint);
    });

    process.on(PROCESS_SIGNALS.sigterm, () => {
        void shutdown(PROCESS_SIGNALS.sigterm);
    });

    process.on(PROCESS_SIGNALS.unhandledRejection, (reason) => {
        logger.fatal({ err: reason }, SERVER_LOG_MESSAGES.unhandledPromiseRejection);
        void shutdown(PROCESS_SIGNALS.unhandledRejection);
    });

    process.on(PROCESS_SIGNALS.uncaughtException, (error) => {
        logger.fatal({ err: error }, SERVER_LOG_MESSAGES.uncaughtException);
        void shutdown(PROCESS_SIGNALS.uncaughtException);
    });
}
