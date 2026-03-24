import multer from "multer";
import type { Request, Response, NextFunction } from "express";

import { BannerErrors } from "@/errors";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

export function multerErrorHandler(
    err: unknown,
    _req: Request,
    _res: Response,
    next: NextFunction,
) {
    if (!(err instanceof multer.MulterError)) {
        return next(err);
    }

    switch (err.code) {
        case "LIMIT_FILE_SIZE":
            return next(BannerErrors.fileTooLarge());

        default:
            return next(BannerErrors.uploadFailed());
    }
}
