import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { logger } from "@/infrastructure/logger/logger";

import { generateOpenAPIDocument } from "@/docs/openapi";

export function initSwagger(app: Express) {
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
        logger.info("Swagger disabled in production");
        return;
    }

    const spec = generateOpenAPIDocument();

    app.get("/docs.json", (_req, res) => {
        res.json(spec);
    });

    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(spec, {
            explorer: true,
        }),
    );

    logger.info("Swagger mounted at /docs");
}
