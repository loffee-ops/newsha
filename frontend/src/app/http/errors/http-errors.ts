export type HttpErrorKind = "NETWORK" | "TIMEOUT" | "HTTP";

export abstract class HttpBaseError extends Error {
    readonly kind: HttpErrorKind;
    readonly status: number | undefined;
    readonly data: unknown | undefined;

    protected constructor(message: string, kind: HttpErrorKind, status?: number, data?: unknown) {
        super(message);

        this.name = new.target.name;
        this.kind = kind;
        this.status = status;
        this.data = data;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NetworkError extends HttpBaseError {
    constructor(data?: unknown) {
        super("Network error", "NETWORK", undefined, data);
    }
}

export class TimeoutError extends HttpBaseError {
    constructor(data?: unknown) {
        super("Request timeout", "TIMEOUT", undefined, data);
    }
}

export class HttpError extends HttpBaseError {
    constructor(status: number, message: string, data?: unknown) {
        super(message, "HTTP", status, data);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(data?: unknown) {
        super(401, "Unauthorized", data);
    }
}

export class ForbiddenError extends HttpError {
    constructor(data?: unknown) {
        super(403, "Forbidden", data);
    }
}

export class NotFoundError extends HttpError {
    constructor(data?: unknown) {
        super(404, "Not found", data);
    }
}
