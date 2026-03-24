import { randomUUID } from "crypto";
import type { RequestHandler } from "express";

export const requestContext: RequestHandler = (req, _res, next) => {
    req.requestId = req.requestId ?? randomUUID();
    next();
};
