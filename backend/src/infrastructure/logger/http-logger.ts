import pinoHttp from "pino-http";
import type { IncomingMessage } from "http";

import { logger } from "./logger";

type RequestWithContext = IncomingMessage & {
    requestId?: string;
    userId?: string;
};

export const httpLogger = pinoHttp({
    logger,

    genReqId: (req) => {
        const request = req as RequestWithContext;
        return request.requestId ?? "unknown";
    },

    customProps: (req) => {
        const request = req as RequestWithContext;

        return {
            requestId: request.requestId,
            userId: request.userId,
        };
    },

    customLogLevel: (_req, res, err) => {
        if (res.statusCode >= 500 || err) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
    },
});
