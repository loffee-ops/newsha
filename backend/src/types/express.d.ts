import "multer";
import "express-serve-static-core";
import type { UserRole } from "@shared/domain/user";

declare module "express-serve-static-core" {
    interface Request {
        requestId?: string;
        userId?: string;
        userRole?: UserRole;
        sessionId?: string;
        file?: Express.Multer.File;
        files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
    }
}
