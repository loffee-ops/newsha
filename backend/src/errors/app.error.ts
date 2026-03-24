import type { AppErrorKind } from "@shared/contracts/error";
import type { ErrorCode } from "@shared/errors";

export class AppError extends Error {
    code: ErrorCode;
    kind: AppErrorKind;
    status: number;
    data?: unknown;
    source = "backend";

    constructor(params: {
        code: ErrorCode;
        kind: AppErrorKind;
        message: string;
        status: number;
        data?: unknown;
    }) {
        super(params.message);
        this.name = "AppError";
        this.code = params.code;
        this.kind = params.kind;
        this.status = params.status;
        this.data = params.data;

        Error.captureStackTrace?.(this, AppError);
    }
}
