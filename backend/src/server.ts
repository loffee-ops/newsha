import "dotenv/config";
import mongoose from "mongoose";
import type { Server } from "http";

import { app } from "./app";
import { SERVER_LOG_MESSAGES } from "./server.constants";
import { setupServerProcess } from "./server-process";

import { logger } from "@/infrastructure/logger";
import cloudinary from "@/infrastructure/cloudinary/cloudinary.client";

import { env } from "@/config";

let server: Server | null = null;

setupServerProcess({
    getServer: () => server,
});

async function start() {
    try {
        logger.info(
            {
                port: env.PORT,
                mongoUriExists: Boolean(env.MONGO_URI),
            },
            SERVER_LOG_MESSAGES.startingServer,
        );

        await mongoose.connect(env.MONGO_URI);
        logger.info(SERVER_LOG_MESSAGES.mongoConnected);

        try {
            await cloudinary.api.ping();
            logger.info(
                {
                    cloudName: env.CLOUDINARY_CLOUD_NAME,
                },
                SERVER_LOG_MESSAGES.cloudinaryAvailable,
            );
        } catch (error) {
            logger.warn({ err: error }, SERVER_LOG_MESSAGES.cloudinaryUnavailable);
        }

        logger.info(
            {
                googleClientIdExists: Boolean(env.GOOGLE_CLIENT_ID),
            },
            SERVER_LOG_MESSAGES.googleAuthConfigLoaded,
        );

        server = app.listen(env.PORT, () => {
            logger.info({ port: env.PORT }, SERVER_LOG_MESSAGES.serverStarted);
        });
    } catch (error) {
        logger.error({ err: error }, SERVER_LOG_MESSAGES.serverStartupError);
        process.exit(1);
    }
}

void start();
